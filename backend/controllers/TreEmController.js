const { TreEm, PhuHuynh, NguoiDung, sequelize } = require('../models');
const { deleteRelatedDeviceData } = require('../utils/deleteUtils');

class TreEmController {
  // Lấy danh sách trẻ em của một phụ huynh
  static async getTreEmByPhuHuynh(req, res) {
    try {
      const { phuHuynhId } = req.params;

      // Kiểm tra phụ huynh có tồn tại không
      const phuHuynh = await PhuHuynh.findByPk(phuHuynhId);
      if (!phuHuynh) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy phụ huynh'
        });
      }

      const treEmList = await TreEm.findAll({
        where: { ma_phu_huynh: phuHuynhId },
        include: [{
          model: NguoiDung,
          as: 'thietBiList',
          attributes: ['nguoi_dung_id', 'ma_thiet_bi', 'ten_thiet_bi', 'loai_thiet_bi', 'ngay_tao']
        }],
        order: [['ten_tre', 'ASC']]
      });

      res.status(200).json({
        success: true,
        message: 'Lấy danh sách trẻ em thành công',
        data: treEmList
      });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách trẻ em:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách trẻ em',
        error: error.message
      });
    }
  }

  // Lấy thông tin chi tiết một trẻ em
  static async getTreEmById(req, res) {
    try {
      const { id } = req.params;

      const treEm = await TreEm.findByPk(id, {
        include: [
          {
            model: PhuHuynh,
            as: 'phuHuynh',
            attributes: ['ma_phu_huynh', 'ten_phu_huynh', 'email_phu_huynh', 'sdt']
          },
          {
            model: NguoiDung,
            as: 'thietBiList',
            attributes: ['nguoi_dung_id', 'ma_thiet_bi', 'ten_thiet_bi', 'loai_thiet_bi', 'ngay_tao']
          }
        ]
      });

      if (!treEm) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy trẻ em'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Lấy thông tin trẻ em thành công',
        data: treEm
      });
    } catch (error) {
      console.error('Lỗi khi lấy thông tin trẻ em:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy thông tin trẻ em',
        error: error.message
      });
    }
  }

  // Tạo trẻ em mới
  static async createTreEm(req, res) {
    try {
      const { ma_phu_huynh, ten_tre, lop, ngay_sinh, truong, gioi_tinh, email_tre_em } = req.body;

      // Kiểm tra phụ huynh có tồn tại không
      const phuHuynh = await PhuHuynh.findByPk(ma_phu_huynh);
      if (!phuHuynh) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy phụ huynh'
        });
      }

      const newTreEm = await TreEm.create({
        ma_phu_huynh,
        ten_tre,
        lop,
        ngay_sinh,
        truong,
        gioi_tinh,
        email_tre_em
      });

      // Lấy thông tin đầy đủ sau khi tạo
      const treEmWithDetails = await TreEm.findByPk(newTreEm.ma_tre_em, {
        include: [{
          model: PhuHuynh,
          as: 'phuHuynh',
          attributes: ['ma_phu_huynh', 'ten_phu_huynh', 'email_phu_huynh']
        }]
      });

      res.status(201).json({
        success: true,
        message: 'Tạo trẻ em thành công',
        data: treEmWithDetails
      });
    } catch (error) {
      console.error('Lỗi khi tạo trẻ em:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi tạo trẻ em',
        error: error.message
      });
    }
  }

  // Cập nhật thông tin trẻ em
  static async updateTreEm(req, res) {
    try {
      const { id } = req.params;
      const { ten_tre, lop, ngay_sinh, truong, gioi_tinh, email_tre_em } = req.body;

      const treEm = await TreEm.findByPk(id);
      if (!treEm) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy trẻ em'
        });
      }

      // Cập nhật thông tin
      const updateData = {};
      if (ten_tre) updateData.ten_tre = ten_tre;
      if (lop) updateData.lop = lop;
      if (ngay_sinh) updateData.ngay_sinh = ngay_sinh;
      if (truong) updateData.truong = truong;
      if (gioi_tinh) updateData.gioi_tinh = gioi_tinh;
      if (email_tre_em) updateData.email_tre_em = email_tre_em;

      await treEm.update(updateData);

      // Lấy thông tin đã cập nhật
      const updatedTreEm = await TreEm.findByPk(id, {
        include: [{
          model: PhuHuynh,
          as: 'phuHuynh',
          attributes: ['ma_phu_huynh', 'ten_phu_huynh', 'email_phu_huynh']
        }]
      });

      res.status(200).json({
        success: true,
        message: 'Cập nhật thông tin trẻ em thành công',
        data: updatedTreEm
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật trẻ em:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi cập nhật trẻ em',
        error: error.message
      });
    }
  }

  // Xóa trẻ em
  static async deleteTreEm(req, res) {
    const transaction = await sequelize.transaction();
    
    try {
      const { id } = req.params;

      const treEm = await TreEm.findByPk(id, {
        include: [{
          model: NguoiDung,
          as: 'thietBiList',
          attributes: ['nguoi_dung_id']
        }]
      });
      
      if (!treEm) {
        await transaction.rollback();
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy trẻ em'
        });
      }

      // Lấy tất cả thiết bị của trẻ em
      const thietBiIds = treEm.thietBiList ? treEm.thietBiList.map(thietBi => thietBi.nguoi_dung_id) : [];

      // Xóa tất cả dữ liệu liên quan đến thiết bị
      if (thietBiIds.length > 0) {
        await deleteRelatedDeviceData(thietBiIds, transaction);
      }

      // Xóa trẻ em (CASCADE sẽ xóa thiết bị)
      await treEm.destroy({ transaction });

      // Commit transaction
      await transaction.commit();

      res.status(200).json({
        success: true,
        message: 'Xóa trẻ em và tất cả dữ liệu liên quan thành công',
        deletedData: {
          treEm: 1,
          thietBi: thietBiIds.length
        }
      });
    } catch (error) {
      await transaction.rollback();
      console.error('Lỗi khi xóa trẻ em:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi xóa trẻ em',
        error: error.message
      });
    }
  }

  // Lấy tất cả trẻ em (cho admin)
  static async getAllTreEm(req, res) {
    try {
      const treEmList = await TreEm.findAll({
        include: [{
          model: PhuHuynh,
          as: 'phuHuynh',
          attributes: ['ma_phu_huynh', 'ten_phu_huynh', 'email_phu_huynh']
        }],
        order: [['ten_tre', 'ASC']]
      });

      res.status(200).json({
        success: true,
        message: 'Lấy danh sách tất cả trẻ em thành công',
        data: treEmList
      });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách trẻ em:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách trẻ em',
        error: error.message
      });
    }
  }
}

module.exports = TreEmController;
