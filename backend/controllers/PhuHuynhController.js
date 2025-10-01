const { PhuHuynh, TreEm, NguoiDung, OtpVerification, sequelize } = require('../models');
const { deleteRelatedDeviceData } = require('../utils/deleteUtils');
const { passwordEncrypt, passwordDecrypt } = require('../utils/cryptoHelper');
const { generateToken, verifyToken } = require('../utils/jwtUtils');
const { sendRegistrationOTP, sendLoginOTP, sendResetPasswordOTP } = require('../utils/smsService');

class PhuHuynhController {
  // Helper method để xác thực OTP
  static async verifyOTP(phone, otp, purpose) {
    const otpRecord = await OtpVerification.findOne({
      where: {
        phone: phone,
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
        // Bao gồm mat_khau để admin có thể xem (cần xác thực)
      });

      res.status(200).json({
        success: true,
        message: 'Lấy danh sách phụ huynh thành công',
        data: phuHuynhList
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

  // Đăng nhập phụ huynh với mật khẩu
  static async loginPhuHuynh(req, res) {
    try {
      const { email_phu_huynh, mat_khau } = req.body;

      // Tìm phụ huynh theo email
      const phuHuynh = await PhuHuynh.findOne({
        where: { email_phu_huynh }
      });

      if (!phuHuynh) {
        return res.status(401).json({
          success: false,
          message: 'Email hoặc mật khẩu không đúng'
        });
      }

      // Giải mã mật khẩu từ database và so sánh
      const decryptedPassword = passwordDecrypt(phuHuynh.mat_khau, 'encryptionkey');
      
      if (decryptedPassword !== mat_khau) {
        return res.status(401).json({
          success: false,
          message: 'Email hoặc mật khẩu không đúng'
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

      // Lưu OTP vào database
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 phút
      await OtpVerification.create({
        phone: sdt,
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

  // Gửi OTP cho đăng nhập
  static async sendLoginOTP(req, res) {
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
      console.log('Sending login OTP to phone:', sdt);
      const result = await sendLoginOTP(sdt);
      console.log('Login OTP result:', result);

      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: 'Không thể gửi mã OTP',
          error: result.error
        });
      }

      // Lưu OTP vào database
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 phút
      await OtpVerification.create({
        phone: sdt,
        otp_code: result.otp,
        purpose: 'login',
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
      console.error('Lỗi khi gửi OTP đăng nhập:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi gửi OTP',
        error: error.message
      });
    }
  }

  // Đăng nhập với OTP
  static async loginWithOTP(req, res) {
    try {
      const { sdt, otp } = req.body;

      if (!sdt || !otp) {
        return res.status(400).json({
          success: false,
          message: 'Số điện thoại và mã OTP là bắt buộc'
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
      const otpVerification = await PhuHuynhController.verifyOTP(sdt, otp, 'login');
      if (!otpVerification.success) {
        return res.status(400).json({
          success: false,
          message: otpVerification.message
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
      console.error('Lỗi khi đăng nhập với OTP:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi đăng nhập',
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

      // Lưu OTP vào database
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 phút
      await OtpVerification.create({
        phone: sdt,
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
