const { ThongTinGoi, NoiDungGoi, GoiDichVu } = require('../models');

class GoiController {
  // Lấy danh sách tất cả gói dịch vụ
  static async getAllGoi(req, res) {
    try {
      const goiList = await ThongTinGoi.findAll({
        include: [{
          model: NoiDungGoi,
          as: 'noiDungList',
          attributes: ['id', 'noi_dung']
        }],
        order: [['gia', 'ASC']]
      });

      res.status(200).json({
        success: true,
        message: 'Lấy danh sách gói dịch vụ thành công',
        data: goiList
      });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách gói dịch vụ:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách gói dịch vụ',
        error: error.message
      });
    }
  }

  // Lấy thông tin chi tiết một gói
  static async getGoiById(req, res) {
    try {
      const { id } = req.params;

      const goi = await ThongTinGoi.findByPk(id, {
        include: [{
          model: NoiDungGoi,
          as: 'noiDungList',
          attributes: ['id', 'noi_dung']
        }]
      });

      if (!goi) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy gói dịch vụ'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Lấy thông tin gói dịch vụ thành công',
        data: goi
      });
    } catch (error) {
      console.error('Lỗi khi lấy thông tin gói dịch vụ:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy thông tin gói dịch vụ',
        error: error.message
      });
    }
  }

  // Tạo gói dịch vụ mới
  static async createGoi(req, res) {
    try {
      const { ten, mo_ta, gia, loai_goi, thoi_han_thang, so_thiet_bi, noi_dung_list } = req.body;

      // Tạo gói dịch vụ
      const newGoi = await ThongTinGoi.create({
        ten,
        mo_ta,
        gia,
        loai_goi,
        thoi_han_thang,
        so_thiet_bi
      });

      // Tạo các nội dung gói nếu có
      if (noi_dung_list && noi_dung_list.length > 0) {
        const noiDungData = noi_dung_list.map(noi_dung => ({
          thong_tin_goi_id: newGoi.id,
          noi_dung
        }));

        await NoiDungGoi.bulkCreate(noiDungData);
      }

      // Lấy thông tin đầy đủ sau khi tạo
      const goiWithDetails = await ThongTinGoi.findByPk(newGoi.id, {
        include: [{
          model: NoiDungGoi,
          as: 'noiDungList',
          attributes: ['id', 'noi_dung']
        }]
      });

      res.status(201).json({
        success: true,
        message: 'Tạo gói dịch vụ thành công',
        data: goiWithDetails
      });
    } catch (error) {
      console.error('Lỗi khi tạo gói dịch vụ:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi tạo gói dịch vụ',
        error: error.message
      });
    }
  }

  // Cập nhật thông tin gói dịch vụ
  static async updateGoi(req, res) {
    try {
      const { id } = req.params;
      const { ten, mo_ta, gia, loai_goi, thoi_han_thang, so_thiet_bi } = req.body;

      const goi = await ThongTinGoi.findByPk(id);
      if (!goi) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy gói dịch vụ'
        });
      }

      // Cập nhật thông tin gói
      const updateData = {};
      if (ten) updateData.ten = ten;
      if (mo_ta) updateData.mo_ta = mo_ta;
      if (gia) updateData.gia = gia;
      if (loai_goi) updateData.loai_goi = loai_goi;
      if (thoi_han_thang) updateData.thoi_han_thang = thoi_han_thang;
      if (so_thiet_bi) updateData.so_thiet_bi = so_thiet_bi;

      await goi.update(updateData);

      // Lấy thông tin đã cập nhật
      const updatedGoi = await ThongTinGoi.findByPk(id, {
        include: [{
          model: NoiDungGoi,
          as: 'noiDungList',
          attributes: ['id', 'noi_dung']
        }]
      });

      res.status(200).json({
        success: true,
        message: 'Cập nhật thông tin gói dịch vụ thành công',
        data: updatedGoi
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật gói dịch vụ:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi cập nhật gói dịch vụ',
        error: error.message
      });
    }
  }

  // Xóa gói dịch vụ
  static async deleteGoi(req, res) {
    const transaction = await require('../models').sequelize.transaction();
    
    try {
      const { id } = req.params;

      const goi = await ThongTinGoi.findByPk(id);
      if (!goi) {
        await transaction.rollback();
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy gói dịch vụ'
        });
      }

      // Cập nhật tất cả gói dịch vụ liên quan thành NULL trước khi xóa
      await GoiDichVu.update(
        { thong_tin_goi_id: null },
        { 
          where: { thong_tin_goi_id: id },
          transaction 
        }
      );

      // Xóa gói dịch vụ
      await goi.destroy({ transaction });

      await transaction.commit();

      res.status(200).json({
        success: true,
        message: 'Xóa gói dịch vụ thành công. Các gói dịch vụ liên quan đã được cập nhật thành NULL.'
      });
    } catch (error) {
      await transaction.rollback();
      console.error('Lỗi khi xóa gói dịch vụ:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi xóa gói dịch vụ',
        error: error.message
      });
    }
  }

  // Thêm nội dung cho gói
  static async addNoiDungToGoi(req, res) {
    try {
      const { goiId } = req.params;
      const { noi_dung } = req.body;

      // Kiểm tra gói có tồn tại không
      const goi = await ThongTinGoi.findByPk(goiId);
      if (!goi) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy gói dịch vụ'
        });
      }

      const newNoiDung = await NoiDungGoi.create({
        thong_tin_goi_id: goiId,
        noi_dung
      });

      res.status(201).json({
        success: true,
        message: 'Thêm nội dung gói thành công',
        data: newNoiDung
      });
    } catch (error) {
      console.error('Lỗi khi thêm nội dung gói:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi thêm nội dung gói',
        error: error.message
      });
    }
  }

  // Cập nhật nội dung gói
  static async updateNoiDungGoi(req, res) {
    try {
      const { noiDungId } = req.params;
      const { noi_dung } = req.body;

      const noiDung = await NoiDungGoi.findByPk(noiDungId);
      if (!noiDung) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy nội dung gói'
        });
      }

      await noiDung.update({ noi_dung });

      res.status(200).json({
        success: true,
        message: 'Cập nhật nội dung gói thành công',
        data: noiDung
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật nội dung gói:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi cập nhật nội dung gói',
        error: error.message
      });
    }
  }

  // Xóa nội dung gói
  static async deleteNoiDungGoi(req, res) {
    try {
      const { noiDungId } = req.params;

      const noiDung = await NoiDungGoi.findByPk(noiDungId);
      if (!noiDung) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy nội dung gói'
        });
      }

      await noiDung.destroy();

      res.status(200).json({
        success: true,
        message: 'Xóa nội dung gói thành công'
      });
    } catch (error) {
      console.error('Lỗi khi xóa nội dung gói:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi xóa nội dung gói',
        error: error.message
      });
    }
  }

  // Lấy danh sách gói theo loại
  static async getGoiByType(req, res) {
    try {
      const { loai_goi } = req.params;

      const goiList = await ThongTinGoi.findAll({
        where: { loai_goi },
        include: [{
          model: NoiDungGoi,
          as: 'noiDungList',
          attributes: ['id', 'noi_dung']
        }],
        order: [['gia', 'ASC']]
      });

      res.status(200).json({
        success: true,
        message: `Lấy danh sách gói ${loai_goi} thành công`,
        data: goiList
      });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách gói theo loại:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách gói theo loại',
        error: error.message
      });
    }
  }

  // Lấy thống kê sử dụng gói
  static async getGoiStatistics(req, res) {
    try {
      const { id } = req.params;

      const goi = await ThongTinGoi.findByPk(id);
      if (!goi) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy gói dịch vụ'
        });
      }

      // Thống kê số lượng người dùng
      const totalUsers = await GoiDichVu.count({
        where: { thong_tin_goi_id: id }
      });

      const activeUsers = await GoiDichVu.count({
        where: { 
          thong_tin_goi_id: id,
          trang_thai: 'DANG_HOAT_DONG'
        }
      });

      const expiredUsers = await GoiDichVu.count({
        where: { 
          thong_tin_goi_id: id,
          trang_thai: 'HET_HAN'
        }
      });

      res.status(200).json({
        success: true,
        message: 'Lấy thống kê gói dịch vụ thành công',
        data: {
          goi: {
            id: goi.id,
            ten: goi.ten,
            gia: goi.gia,
            loai_goi: goi.loai_goi
          },
          thong_ke: {
            tong_nguoi_dung: totalUsers,
            dang_hoat_dong: activeUsers,
            het_han: expiredUsers
          }
        }
      });
    } catch (error) {
      console.error('Lỗi khi lấy thống kê gói:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy thống kê gói',
        error: error.message
      });
    }
  }

  // Lấy nội dung của gói
  static async getNoiDungByGoi(req, res) {
    try {
      const { id } = req.params;

      // Kiểm tra gói có tồn tại không
      const goi = await ThongTinGoi.findByPk(id);
      if (!goi) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy gói dịch vụ'
        });
      }

      // Lấy danh sách nội dung
      const noiDungList = await NoiDungGoi.findAll({
        where: { thong_tin_goi_id: id },
        order: [['id', 'ASC']]
      });

      res.status(200).json({
        success: true,
        message: 'Lấy danh sách nội dung gói thành công',
        data: noiDungList
      });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách nội dung gói:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách nội dung gói',
        error: error.message
      });
    }
  }

  // Lấy danh sách gói dịch vụ của một thiết bị
  static async getGoiByThietBi(req, res) {
    try {
      const { ma_thiet_bi } = req.params;

      const goiList = await GoiDichVu.findAll({
        where: { ma_thiet_bi },
        include: [{
          model: ThongTinGoi,
          as: 'thongTinGoi',
          attributes: ['id', 'ten', 'mo_ta', 'gia', 'loai_goi', 'thoi_han_thang']
        }],
        order: [['ngay_bat_dau', 'DESC']]
      });

      res.status(200).json({
        success: true,
        message: 'Lấy danh sách gói dịch vụ của thiết bị thành công',
        data: goiList
      });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách gói dịch vụ của thiết bị:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách gói dịch vụ của thiết bị',
        error: error.message
      });
    }
  }

  // Lấy gói đang hoạt động của một thiết bị
  static async getActiveGoiByThietBi(req, res) {
    try {
      const { ma_thiet_bi } = req.params;

      const activeGoi = await GoiDichVu.findOne({
        where: { 
          ma_thiet_bi,
          trang_thai: 'DANG_HOAT_DONG'
        },
        include: [{
          model: ThongTinGoi,
          as: 'thongTinGoi',
          attributes: ['id', 'ten', 'mo_ta', 'gia', 'loai_goi', 'thoi_han_thang']
        }]
      });

      if (!activeGoi) {
        return res.status(404).json({
          success: false,
          message: 'Thiết bị không có gói dịch vụ đang hoạt động'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Lấy gói đang hoạt động thành công',
        data: activeGoi
      });
    } catch (error) {
      console.error('Lỗi khi lấy gói đang hoạt động:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy gói đang hoạt động',
        error: error.message
      });
    }
  }

  // Cập nhật thời gian gói dịch vụ của thiết bị
  static async updateGoiTimeForThietBi(req, res) {
    try {
      const { ma_thiet_bi } = req.params;
      const { ngay_bat_dau, ngay_ket_thuc } = req.body;

      // Tìm gói gần nhất của thiết bị (kể cả đã hết hạn) để cho phép chỉnh sửa & kích hoạt lại
      const goiToUpdate = await GoiDichVu.findOne({
        where: { ma_thiet_bi },
        order: [['ngay_ket_thuc', 'DESC']]
      });

      if (!goiToUpdate) {
        return res.status(404).json({
          success: false,
          message: 'Thiết bị chưa có gói dịch vụ nào để cập nhật'
        });
      }

      // Validation
      if (!ngay_bat_dau || !ngay_ket_thuc) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng nhập đầy đủ ngày bắt đầu và ngày kết thúc'
        });
      }

      const startDate = new Date(ngay_bat_dau);
      const endDate = new Date(ngay_ket_thuc);
      const now = new Date();

      if (startDate >= endDate) {
        return res.status(400).json({
          success: false,
          message: 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc'
        });
      }

      // Xác định trạng thái mới dựa trên ngày kết thúc
      const newStatus = endDate <= now ? 'HUY' : 'DANG_HOAT_DONG';

      // Cập nhật thời gian và trạng thái
      await goiToUpdate.update({
        ngay_bat_dau: startDate.toISOString(),
        ngay_ket_thuc: endDate.toISOString(),
        trang_thai: newStatus
      });

      // Lấy thông tin đã cập nhật
      const updatedGoi = await GoiDichVu.findByPk(goiToUpdate.id, {
        include: [{
          model: ThongTinGoi,
          as: 'thongTinGoi',
          attributes: ['id', 'ten', 'mo_ta', 'gia', 'loai_goi', 'thoi_han_thang']
        }]
      });

      res.status(200).json({
        success: true,
        message: 'Cập nhật thời gian gói dịch vụ thành công',
        data: updatedGoi
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật thời gian gói dịch vụ:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi cập nhật thời gian gói dịch vụ',
        error: error.message
      });
    }
  }

  // Gia hạn gói dịch vụ của thiết bị
  static async extendGoiForThietBi(req, res) {
    try {
      const { ma_thiet_bi } = req.params;
      const { so_thang_gia_han } = req.body;

      // Kiểm tra thiết bị có gói đang hoạt động không
      const activeGoi = await GoiDichVu.findOne({
        where: { 
          ma_thiet_bi,
          trang_thai: 'DANG_HOAT_DONG'
        }
      });

      if (!activeGoi) {
        return res.status(404).json({
          success: false,
          message: 'Thiết bị không có gói dịch vụ đang hoạt động'
        });
      }

      if (!so_thang_gia_han || so_thang_gia_han <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Số tháng gia hạn phải lớn hơn 0'
        });
      }

      // Tính ngày kết thúc mới
      const currentEndDate = new Date(activeGoi.ngay_ket_thuc);
      const newEndDate = new Date(currentEndDate);
      newEndDate.setMonth(newEndDate.getMonth() + so_thang_gia_han);

      // Cập nhật ngày kết thúc
      await activeGoi.update({
        ngay_ket_thuc: newEndDate.toISOString()
      });

      // Lấy thông tin đã cập nhật
      const updatedGoi = await GoiDichVu.findByPk(activeGoi.id, {
        include: [{
          model: ThongTinGoi,
          as: 'thongTinGoi',
          attributes: ['id', 'ten', 'mo_ta', 'gia', 'loai_goi', 'thoi_han_thang']
        }]
      });

      res.status(200).json({
        success: true,
        message: `Gia hạn gói dịch vụ thành công thêm ${so_thang_gia_han} tháng`,
        data: updatedGoi
      });
    } catch (error) {
      console.error('Lỗi khi gia hạn gói dịch vụ:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi gia hạn gói dịch vụ',
        error: error.message
      });
    }
  }
}

module.exports = GoiController;
