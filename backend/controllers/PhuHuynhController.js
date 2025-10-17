const { PhuHuynh, TreEm, NguoiDung, OtpVerification, sequelize } = require('../models');
const { deleteRelatedDeviceData } = require('../utils/deleteUtils');
const { passwordEncrypt, passwordDecrypt } = require('../utils/cryptoHelper');
const { generateToken, verifyToken } = require('../utils/jwtUtils');
const { sendRegistrationOTP, sendResetPasswordOTP } = require('../utils/smsService');

class PhuHuynhController {
  // Helper method để normalize phone number
  static normalizePhone(phone) {
    // Chuyển về format 0xxxxxxxxx (10 số)
    if (phone.startsWith('84')) {
      return '0' + phone.substring(2);
    }
    return phone;
  }

  // Role-based helpers
  static getRoleFromFlag(isAdmin) {
    // Map boolean flag to role string
    return isAdmin ? 'admin' : 'user';
  }

  static getFlagFromRole(role) {
    // Normalize role input to boolean admin flag
    if (!role) return false;
    const normalized = String(role).trim().toLowerCase();
    return normalized === 'admin';
  }

  // Helper method để xác thực OTP
  static async verifyOTP(phone, otp, purpose) {
    // Normalize phone number
    const normalizedPhone = PhuHuynhController.normalizePhone(phone);

    const otpRecord = await OtpVerification.findOne({
      where: {
        phone: normalizedPhone,
        otp_code: otp,
        purpose: purpose,
        is_used: false,
        expires_at: {
          [sequelize.Sequelize.Op.gt]: new Date()
        }
      }
    });

    if (!otpRecord) {
      return { success: false, message: 'Mã OTP không hợp lệ hoặc đã hết hạn' };
    }

    // Đánh dấu OTP đã sử dụng
    await otpRecord.update({
      is_used: true,
      used_at: new Date()
    });

    return { success: true };
  }
  // Lấy danh sách tất cả phụ huynh
  static async getAllPhuHuynh(req, res) {
  try {
    const phuHuynhList = await PhuHuynh.findAll({
      include: [{
        model: TreEm,
        as: 'treEmList',
        attributes: ['ma_tre_em', 'ten_tre', 'lop', 'gioi_tinh']
      }]
    });

    const decryptedList = phuHuynhList.map(ph => {
      const phObj = ph.toJSON();

      // Kiểm tra mật khẩu có khả năng giải mã không
      if (phObj.mat_khau && typeof phObj.mat_khau === 'string') {
        try {
          // Kiểm tra xem chuỗi có hợp lệ dạng Base64 hay không
          const isBase64 = /^[A-Za-z0-9+/=]+$/.test(phObj.mat_khau.trim());
          if (isBase64) {
            phObj.mat_khau = passwordDecrypt(phObj.mat_khau, 'encryptionkey');
          } else {
            phObj.mat_khau = '[Chuỗi không hợp lệ]';
          }
        } catch (err) {
          console.warn(`⚠️ Giải mã thất bại cho ID ${phObj.ma_phu_huynh}: ${err.message}`);
          phObj.mat_khau = '[Giải mã lỗi]';
        }
      } else {
        phObj.mat_khau = '';
      }

      return phObj;
    });

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách phụ huynh thành công',
      data: decryptedList
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phụ huynh:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh sách phụ huynh',
      error: error.message
    });
  }
}
  // Lấy thông tin phụ huynh theo ID
  static async getPhuHuynhById(req, res) {
    try {
      const { id } = req.params;
      const phuHuynh = await PhuHuynh.findByPk(id, {
        include: [{
          model: TreEm,
          as: 'treEmList',
          attributes: ['ma_tre_em', 'ten_tre', 'lop', 'ngay_sinh', 'truong', 'gioi_tinh', 'email_tre_em']
        }]
        // Bao gồm mat_khau để admin có thể xem
      });

      if (!phuHuynh) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy phụ huynh'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Lấy thông tin phụ huynh thành công',
        data: phuHuynh
      });
    } catch (error) {
      console.error('Lỗi khi lấy thông tin phụ huynh:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy thông tin phụ huynh',
        error: error.message
      });
    }
  }

  // Tạo phụ huynh mới
  static async createPhuHuynh(req, res) {
    try {
      const { email_phu_huynh, sdt, ten_phu_huynh, mat_khau } = req.body;

      // Kiểm tra email đã tồn tại chưa
      const existingPhuHuynh = await PhuHuynh.findOne({
        where: { email_phu_huynh }
      });

      if (existingPhuHuynh) {
        return res.status(400).json({
          success: false,
          message: 'Email đã được sử dụng'
        });
      }

      // Kiểm tra số điện thoại đã tồn tại chưa
      if (sdt) {
        const existingPhone = await PhuHuynh.findOne({
          where: { sdt }
        });

        if (existingPhone) {
          return res.status(400).json({
            success: false,
            message: 'Số điện thoại đã được sử dụng'
          });
        }
      }

      // Mã hóa mật khẩu trước khi lưu
      const encryptedPassword = passwordEncrypt(mat_khau, 'encryptionkey');

      const newPhuHuynh = await PhuHuynh.create({
        email_phu_huynh,
        sdt,
        ten_phu_huynh,
        mat_khau: encryptedPassword
      });

      // Không trả về mật khẩu
      const { mat_khau: _, ...phuHuynhData } = newPhuHuynh.toJSON();

      res.status(201).json({
        success: true,
        message: 'Tạo phụ huynh thành công',
        data: phuHuynhData
      });
    } catch (error) {
      console.error('Lỗi khi tạo phụ huynh:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi tạo phụ huynh',
        error: error.message
      });
    }
  }

  // Cập nhật thông tin phụ huynh
  static async updatePhuHuynh(req, res) {
    try {
      const { id } = req.params;
      const { email_phu_huynh, sdt, ten_phu_huynh, mat_khau } = req.body;

      const phuHuynh = await PhuHuynh.findByPk(id);
      if (!phuHuynh) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy phụ huynh'
        });
      }

      // Kiểm tra email trùng lặp (nếu có thay đổi email)
      if (email_phu_huynh && email_phu_huynh !== phuHuynh.email_phu_huynh) {
        const existingPhuHuynh = await PhuHuynh.findOne({
          where: { email_phu_huynh }
        });

        if (existingPhuHuynh) {
          return res.status(400).json({
            success: false,
            message: 'Email đã được sử dụng'
          });
        }
      }

      // Kiểm tra số điện thoại trùng lặp (nếu có thay đổi số điện thoại)
      if (sdt && sdt !== phuHuynh.sdt) {
        const existingPhone = await PhuHuynh.findOne({
          where: { sdt }
        });

        if (existingPhone) {
          return res.status(400).json({
            success: false,
            message: 'Số điện thoại đã được sử dụng'
          });
        }
      }

      // Cập nhật thông tin
      const updateData = {};
      if (email_phu_huynh) updateData.email_phu_huynh = email_phu_huynh;
      if (sdt) updateData.sdt = sdt;
      if (ten_phu_huynh) updateData.ten_phu_huynh = ten_phu_huynh;
      if (mat_khau) updateData.mat_khau = mat_khau;

      await phuHuynh.update(updateData);

      // Lấy thông tin đã cập nhật
      const updatedPhuHuynh = await PhuHuynh.findByPk(id, {
        attributes: { exclude: ['mat_khau'] }
      });

      res.status(200).json({
        success: true,
        message: 'Cập nhật thông tin phụ huynh thành công',
        data: updatedPhuHuynh
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật phụ huynh:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi cập nhật phụ huynh',
        error: error.message
      });
    }
  }

  // Lấy vai trò của phụ huynh theo ID
  static async getUserRole(req, res) {
    try {
      const { id } = req.params;
      const phuHuynh = await PhuHuynh.findByPk(id, {
        attributes: ['ma_phu_huynh', 'email_phu_huynh', 'sdt', 'ten_phu_huynh', 'la_admin']
      });

      if (!phuHuynh) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy phụ huynh'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Lấy vai trò thành công',
        data: {
          ma_phu_huynh: phuHuynh.ma_phu_huynh,
          role: PhuHuynhController.getRoleFromFlag(phuHuynh.la_admin)
        }
      });
    } catch (error) {
      console.error('Lỗi khi lấy vai trò:', error);
      return res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy vai trò',
        error: error.message
      });
    }
  }

  // Cập nhật vai trò của phụ huynh (yêu cầu admin)
  static async updateUserRole(req, res) {
    try {
      // req.user được set bởi authenticateToken middleware
      if (!req.user || !req.user.la_admin) {
        return res.status(403).json({
          success: false,
          message: 'Yêu cầu quyền admin'
        });
      }

      const { id } = req.params;
      const { role } = req.body; // 'admin' | 'user'

      if (!role || !['admin', 'user'].includes(String(role).toLowerCase())) {
        return res.status(400).json({
          success: false,
          message: 'Giá trị role không hợp lệ (chỉ chấp nhận: admin, user)'
        });
      }

      // Chặn tự hạ quyền chính mình để tránh mất quyền toàn hệ thống
      if (Number(id) === Number(req.user.ma_phu_huynh) && String(role).toLowerCase() === 'user') {
        return res.status(400).json({
          success: false,
          message: 'Không thể tự hạ quyền của chính bạn'
        });
      }

      const phuHuynh = await PhuHuynh.findByPk(id);
      if (!phuHuynh) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy phụ huynh'
        });
      }

      const newFlag = PhuHuynhController.getFlagFromRole(role);
      await phuHuynh.update({ la_admin: newFlag });

      return res.status(200).json({
        success: true,
        message: 'Cập nhật vai trò thành công',
        data: {
          ma_phu_huynh: phuHuynh.ma_phu_huynh,
          role: PhuHuynhController.getRoleFromFlag(newFlag)
        }
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật vai trò:', error);
      return res.status(500).json({
        success: false,
        message: 'Lỗi server khi cập nhật vai trò',
        error: error.message
      });
    }
  }

  // Liệt kê phụ huynh theo vai trò
  static async listUsersByRole(req, res) {
    try {
      const { role } = req.query; // 'admin' | 'user'
      if (!role || !['admin', 'user'].includes(String(role).toLowerCase())) {
        return res.status(400).json({
          success: false,
          message: 'Giá trị role không hợp lệ (chỉ chấp nhận: admin, user)'
        });
      }

      const isAdmin = PhuHuynhController.getFlagFromRole(role);
      const users = await PhuHuynh.findAll({
        where: { la_admin: isAdmin },
        attributes: { exclude: ['mat_khau'] }
      });

      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách người dùng theo vai trò thành công',
        data: users
      });
    } catch (error) {
      console.error('Lỗi khi liệt kê theo vai trò:', error);
      return res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách theo vai trò',
        error: error.message
      });
    }
  }

  // Danh sách các vai trò khả dụng
  static async getAvailableRoles(req, res) {
    try {
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách vai trò thành công',
        data: ['admin', 'user']
      });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách vai trò:', error);
      return res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách vai trò',
        error: error.message
      });
    }
  }

  // API để giải mã mật khẩu (chỉ để test)
  static async decryptPassword(req, res) {
    try {
      const { encryptedPassword } = req.body;
      
      if (!encryptedPassword) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng cung cấp mật khẩu đã mã hóa'
        });
      }

      // Giải mã mật khẩu
      const decryptedPassword = passwordDecrypt(encryptedPassword, 'encryptionkey');

      res.status(200).json({
        success: true,
        message: 'Giải mã mật khẩu thành công',
        data: {
          originalPassword: decryptedPassword
        }
      });
    } catch (error) {
      console.error('Lỗi khi giải mã mật khẩu:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi giải mã mật khẩu',
        error: error.message
      });
    }
  }

  // Xóa phụ huynh
  static async deletePhuHuynh(req, res) {
    const transaction = await sequelize.transaction();
    
    try {
      const { id } = req.params;

      const phuHuynh = await PhuHuynh.findByPk(id);
      if (!phuHuynh) {
        await transaction.rollback();
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy phụ huynh'
        });
      }

      // 1. Lấy tất cả trẻ em của phụ huynh
      const treEmList = await TreEm.findAll({
        where: { ma_phu_huynh: id },
        include: [{
          model: NguoiDung,
          as: 'thietBiList',
          attributes: ['nguoi_dung_id']
        }]
      });

      // 2. Lấy tất cả thiết bị của các trẻ em
      const thietBiIds = [];
      treEmList.forEach(treEm => {
        if (treEm.thietBiList) {
          treEm.thietBiList.forEach(thietBi => {
            thietBiIds.push(thietBi.nguoi_dung_id);
          });
        }
      });

      // 3. Xóa tất cả dữ liệu liên quan đến thiết bị
      if (thietBiIds.length > 0) {
        await deleteRelatedDeviceData(thietBiIds, transaction);
      }

      // 4. Xóa phụ huynh (CASCADE sẽ xóa trẻ em và thiết bị)
      await phuHuynh.destroy({ transaction });

      // 5. Commit transaction
      await transaction.commit();

      res.status(200).json({
        success: true,
        message: 'Xóa phụ huynh và tất cả dữ liệu liên quan thành công',
        deletedData: {
          phuHuynh: 1,
          treEm: treEmList.length,
          thietBi: thietBiIds.length
        }
      });
    } catch (error) {
      await transaction.rollback();
      console.error('Lỗi khi xóa phụ huynh:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi xóa phụ huynh',
        error: error.message
      });
    }
  }

  // Đăng nhập phụ huynh với mật khẩu bằng số điện thoại
  static async loginPhuHuynh(req, res) {
    try {
      const { sdt, mat_khau } = req.body;

      // Normalize phone number
      const normalizedPhone = PhuHuynhController.normalizePhone(sdt);

      // Tìm phụ huynh theo số điện thoại
      const phuHuynh = await PhuHuynh.findOne({
        where: { sdt: normalizedPhone }
      });

      if (!phuHuynh) {
        return res.status(401).json({
          success: false,
          message: 'Số điện thoại hoặc mật khẩu không đúng'
        });
      }

      // Giải mã mật khẩu từ database và so sánh
      const decryptedPassword = passwordDecrypt(phuHuynh.mat_khau, 'encryptionkey');
      
      if (decryptedPassword !== mat_khau) {
        return res.status(401).json({
          success: false,
          message: 'Số điện thoại hoặc mật khẩu không đúng'
        });
      }

      // Tạo JWT token
      const token = generateToken({
        ma_phu_huynh: phuHuynh.ma_phu_huynh,
        email_phu_huynh: phuHuynh.email_phu_huynh,
        la_admin: phuHuynh.la_admin
      });

      // Trả về thông tin phụ huynh (không bao gồm mật khẩu)
      const { mat_khau: _, ...phuHuynhData } = phuHuynh.toJSON();

      res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công',
        data: {
          user: phuHuynhData,
          token: token
        }
      });
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi đăng nhập',
        error: error.message
      });
    }
  }

  // Gửi OTP cho đăng ký
  static async sendRegistrationOTP(req, res) {
    try {
      const { sdt } = req.body;

      if (!sdt) {
        return res.status(400).json({
          success: false,
          message: 'Số điện thoại là bắt buộc'
        });
      }

      // Kiểm tra số điện thoại đã được sử dụng chưa
      const existingPhuHuynh = await PhuHuynh.findOne({
        where: { sdt }
      });

      if (existingPhuHuynh) {
        return res.status(400).json({
          success: false,
          message: 'Số điện thoại đã được sử dụng'
        });
      }

      // Gửi OTP
      console.log('Sending OTP to phone:', sdt);
      const result = await sendRegistrationOTP(sdt);
      console.log('OTP result:', result);

      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: 'Không thể gửi mã OTP',
          error: result.error
        });
      }

      // Normalize phone number
      const normalizedPhone = PhuHuynhController.normalizePhone(sdt);

      // Xóa tất cả OTP cũ chưa sử dụng cho purpose này
      await OtpVerification.update(
        { is_used: true, used_at: new Date() },
        {
          where: {
            phone: normalizedPhone,
            purpose: 'registration',
            is_used: false
          }
        }
      );

      // Lưu OTP mới vào database
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 phút
      await OtpVerification.create({
        phone: normalizedPhone,
        otp_code: result.otp,
        purpose: 'registration',
        expires_at: expiresAt
      });

      res.status(200).json({
        success: true,
        message: 'Mã OTP đã được gửi đến số điện thoại của bạn',
        data: {
          phone: sdt,
          // Trong thực tế không nên trả về OTP, chỉ để test
          otp: result.otp
        }
      });
    } catch (error) {
      console.error('Lỗi khi gửi OTP đăng ký:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi gửi OTP',
        error: error.message
      });
    }
  }

  // Đăng ký phụ huynh với OTP
  static async registerPhuHuynh(req, res) {
    try {
      const { email_phu_huynh, sdt, ten_phu_huynh, mat_khau, otp } = req.body;

      // Validation
      if (!email_phu_huynh || !sdt || !ten_phu_huynh || !mat_khau || !otp) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng điền đầy đủ thông tin'
        });
      }

      // Kiểm tra email đã tồn tại chưa
      const existingEmail = await PhuHuynh.findOne({
        where: { email_phu_huynh }
      });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: 'Email đã được sử dụng'
        });
      }

      // Kiểm tra số điện thoại đã tồn tại chưa
      const existingPhone = await PhuHuynh.findOne({
        where: { sdt }
      });

      if (existingPhone) {
        return res.status(400).json({
          success: false,
          message: 'Số điện thoại đã được sử dụng'
        });
      }

      // Xác thực OTP
      const otpVerification = await PhuHuynhController.verifyOTP(sdt, otp, 'registration');
      if (!otpVerification.success) {
        return res.status(400).json({
          success: false,
          message: otpVerification.message
        });
      }

      // Mã hóa mật khẩu
      const encryptedPassword = passwordEncrypt(mat_khau, 'encryptionkey');

      // Tạo phụ huynh mới
      const newPhuHuynh = await PhuHuynh.create({
        email_phu_huynh,
        sdt,
        ten_phu_huynh,
        mat_khau: encryptedPassword,
        la_admin: false // Mặc định không phải admin
      });

      // Tạo JWT token
      const token = generateToken({
        ma_phu_huynh: newPhuHuynh.ma_phu_huynh,
        email_phu_huynh: newPhuHuynh.email_phu_huynh,
        la_admin: newPhuHuynh.la_admin
      });

      // Không trả về mật khẩu
      const { mat_khau: _, ...phuHuynhData } = newPhuHuynh.toJSON();

      res.status(201).json({
        success: true,
        message: 'Đăng ký thành công',
        data: {
          user: phuHuynhData,
          token: token
        }
      });
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi đăng ký',
        error: error.message
      });
    }
  }



  // Gửi OTP cho reset password
  static async sendResetPasswordOTP(req, res) {
    try {
      const { sdt } = req.body;

      if (!sdt) {
        return res.status(400).json({
          success: false,
          message: 'Số điện thoại là bắt buộc'
        });
      }

      // Kiểm tra số điện thoại có tồn tại không
      const phuHuynh = await PhuHuynh.findOne({
        where: { sdt }
      });

      if (!phuHuynh) {
        return res.status(404).json({
          success: false,
          message: 'Số điện thoại chưa được đăng ký'
        });
      }

      // Gửi OTP
      console.log('Sending reset password OTP to phone:', sdt);
      const result = await sendResetPasswordOTP(sdt);
      console.log('Reset password OTP result:', result);

      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: 'Không thể gửi mã OTP',
          error: result.error
        });
      }

      // Normalize phone number
      const normalizedPhone = PhuHuynhController.normalizePhone(sdt);

      // Xóa tất cả OTP cũ chưa sử dụng cho purpose này
      await OtpVerification.update(
        { is_used: true, used_at: new Date() },
        {
          where: {
            phone: normalizedPhone,
            purpose: 'reset_password',
            is_used: false
          }
        }
      );

      // Lưu OTP mới vào database
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 phút
      await OtpVerification.create({
        phone: normalizedPhone,
        otp_code: result.otp,
        purpose: 'reset_password',
        expires_at: expiresAt
      });

      res.status(200).json({
        success: true,
        message: 'Mã OTP đã được gửi đến số điện thoại của bạn',
        data: {
          phone: sdt,
          // Trong thực tế không nên trả về OTP, chỉ để test
          otp: result.otp
        }
      });
    } catch (error) {
      console.error('Lỗi khi gửi OTP reset password:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi gửi OTP',
        error: error.message
      });
    }
  }

  // Reset password với OTP
  static async resetPassword(req, res) {
    try {
      const { sdt, otp, mat_khau_moi } = req.body;

      if (!sdt || !otp || !mat_khau_moi) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng điền đầy đủ thông tin'
        });
      }

      // Tìm phụ huynh theo số điện thoại
      const phuHuynh = await PhuHuynh.findOne({
        where: { sdt }
      });

      if (!phuHuynh) {
        return res.status(404).json({
          success: false,
          message: 'Số điện thoại chưa được đăng ký'
        });
      }

      // Xác thực OTP
      const otpVerification = await PhuHuynhController.verifyOTP(sdt, otp, 'reset_password');
      if (!otpVerification.success) {
        return res.status(400).json({
          success: false,
          message: otpVerification.message
        });
      }

      // Mã hóa mật khẩu mới
      const encryptedPassword = passwordEncrypt(mat_khau_moi, 'encryptionkey');

      // Cập nhật mật khẩu
      await phuHuynh.update({
        mat_khau: encryptedPassword
      });

      res.status(200).json({
        success: true,
        message: 'Đặt lại mật khẩu thành công'
      });
    } catch (error) {
      console.error('Lỗi khi reset password:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi đặt lại mật khẩu',
        error: error.message
      });
    }
  }

  // Gửi OTP cho đổi mật khẩu (dành cho user đã đăng nhập)
  static async sendChangePasswordOTP(req, res) {
    try {
      // req.user được set bởi authenticateToken middleware
      const { ma_phu_huynh } = req.user;

      // Tìm phụ huynh để lấy số điện thoại
      const phuHuynh = await PhuHuynh.findByPk(ma_phu_huynh);
      if (!phuHuynh) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy thông tin người dùng'
        });
      }

      // Gửi OTP
      console.log('Sending change password OTP to phone:', phuHuynh.sdt);
      const result = await sendResetPasswordOTP(phuHuynh.sdt);
      console.log('Change password OTP result:', result);

      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: 'Không thể gửi mã OTP',
          error: result.error
        });
      }

      // Normalize phone number
      const normalizedPhone = PhuHuynhController.normalizePhone(phuHuynh.sdt);

      // Xóa tất cả OTP cũ chưa sử dụng cho purpose này
      await OtpVerification.update(
        { is_used: true, used_at: new Date() },
        {
          where: {
            phone: normalizedPhone,
            purpose: 'reset_password', // DÙNG CHUNG VỚI RESET PASSWORD
            is_used: false
          }
        }
      );

      // Lưu OTP mới vào database
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 phút
      await OtpVerification.create({
        phone: normalizedPhone,
        otp_code: result.otp,
        purpose: 'reset_password', // DÙNG CHUNG VỚI RESET PASSWORD
        expires_at: expiresAt
      });

      res.status(200).json({
        success: true,
        message: 'Mã OTP đã được gửi đến số điện thoại của bạn',
        data: {
          phone: phuHuynh.sdt,
          // Trong thực tế không nên trả về OTP, chỉ để test
          otp: result.otp
        }
      });
    } catch (error) {
      console.error('Lỗi khi gửi OTP đổi mật khẩu:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi gửi OTP',
        error: error.message
      });
    }
  }

  // Đổi mật khẩu với OTP (dành cho user đã đăng nhập) - COPY LOGIC TỪ RESET PASSWORD
  static async changePasswordWithOTP(req, res) {
    try {
      const { mat_khau_cu, mat_khau_moi, otp } = req.body;
      // req.user được set bởi authenticateToken middleware
      const { ma_phu_huynh } = req.user;

      if (!mat_khau_cu || !mat_khau_moi || !otp) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng điền đầy đủ thông tin'
        });
      }

      // Tìm phụ huynh
      const phuHuynh = await PhuHuynh.findByPk(ma_phu_huynh);
      if (!phuHuynh) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy thông tin người dùng'
        });
      }

      // Kiểm tra mật khẩu cũ
      const decryptedOldPassword = passwordDecrypt(phuHuynh.mat_khau, 'encryptionkey');
      if (decryptedOldPassword !== mat_khau_cu) {
        return res.status(400).json({
          success: false,
          message: 'Mật khẩu cũ không đúng'
        });
      }

      // COPY LOGIC TỪ RESET PASSWORD - Xác thực OTP với CÙNG SĐT như lúc gửi
      const sdt = phuHuynh.sdt; // Dùng cùng biến sdt như lúc gửi OTP
      const otpVerification = await PhuHuynhController.verifyOTP(sdt, otp, 'reset_password'); // DÙNG CHUNG VỚI RESET PASSWORD
      if (!otpVerification.success) {
        return res.status(400).json({
          success: false,
          message: otpVerification.message
        });
      }

      // COPY LOGIC TỪ RESET PASSWORD - Mã hóa mật khẩu mới
      const encryptedPassword = passwordEncrypt(mat_khau_moi, 'encryptionkey');

      // COPY LOGIC TỪ RESET PASSWORD - Cập nhật mật khẩu
      await phuHuynh.update({
        mat_khau: encryptedPassword
      });

      res.status(200).json({
        success: true,
        message: 'Đổi mật khẩu thành công'
      });
    } catch (error) {
      console.error('Lỗi khi đổi mật khẩu:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi đổi mật khẩu',
        error: error.message
      });
    }
  }

  // Lấy thông tin user hiện tại từ token
  static async getCurrentUser(req, res) {
    try {
      // req.user được set bởi authenticateToken middleware
      const { ma_phu_huynh } = req.user;

      const phuHuynh = await PhuHuynh.findByPk(ma_phu_huynh, {
        attributes: { exclude: ['mat_khau'] }
      });

      if (!phuHuynh) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy thông tin người dùng'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Lấy thông tin người dùng thành công',
        data: phuHuynh
      });
    } catch (error) {
      console.error('Lỗi khi lấy thông tin user:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy thông tin người dùng',
        error: error.message
      });
    }
  }
}

module.exports = PhuHuynhController;
