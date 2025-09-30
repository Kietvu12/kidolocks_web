const { PhuHuynh, TreEm, NguoiDung, sequelize } = require('../models');
const { deleteRelatedDeviceData } = require('../utils/deleteUtils');
const { passwordEncrypt, passwordDecrypt } = require('../utils/cryptoUtils');

class PhuHuynhController {
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
      const encryptedPassword = passwordEncrypt(mat_khau, 'kidlock_key_2024');

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
      const decryptedPassword = passwordDecrypt(encryptedPassword, 'kidlock_key_2024');

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

  // Đăng nhập phụ huynh
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
      const decryptedPassword = passwordDecrypt(phuHuynh.mat_khau, 'kidlock_key_2024');
      
      if (decryptedPassword !== mat_khau) {
        return res.status(401).json({
          success: false,
          message: 'Email hoặc mật khẩu không đúng'
        });
      }

      // Trả về thông tin phụ huynh (không bao gồm mật khẩu)
      const { mat_khau: _, ...phuHuynhData } = phuHuynh.toJSON();

      res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công',
        data: phuHuynhData
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
}

module.exports = PhuHuynhController;
