const { NguoiDung, TreEm, GoiDichVu, ThongTinGoi, NoiDungGoi, sequelize } = require('../models');
const { deleteSingleDeviceData } = require('../utils/deleteUtils');
const { v4: uuidv4 } = require('uuid');

class ThietBiController {
  // Lấy danh sách thiết bị của một trẻ em
  static async getThietBiByTreEm(req, res) {
    try {
      const { treEmId } = req.params;

      // Kiểm tra trẻ em có tồn tại không
      const treEm = await TreEm.findByPk(treEmId);
      if (!treEm) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy trẻ em'
        });
      }

      // Lấy tất cả thiết bị của trẻ em này
      const thietBiList = await NguoiDung.findAll({
        where: { ma_tre_em: treEmId },
        include: [
          {
            model: TreEm,
            as: 'treEm',
            attributes: ['ma_tre_em', 'ten_tre', 'lop', 'gioi_tinh', 'truong']
          },
          {
            model: GoiDichVu,
            as: 'goiDichVuList',
            required: false,
            include: [{
              model: ThongTinGoi,
              as: 'thongTinGoi',
              attributes: ['id', 'ten', 'gia', 'loai_goi', 'thoi_han_thang', 'mo_ta']
            }],
            order: [['ngay_bat_dau', 'DESC']]
          }
        ],
        order: [['ngay_tao', 'DESC']]
      });

      // Xử lý dữ liệu để hiển thị rõ ràng hơn
      const processedData = thietBiList.map(thietBi => {
        const activeGoi = thietBi.goiDichVuList?.find(goi => goi.trang_thai === 'DANG_HOAT_DONG');
        const allGoi = thietBi.goiDichVuList || [];
        
        return {
          ...thietBi.toJSON(),
          activeGoi: activeGoi || null,
          totalGoi: allGoi.length,
          goiHistory: allGoi
        };
      });

      res.status(200).json({
        success: true,
        message: 'Lấy danh sách thiết bị thành công',
        data: processedData
      });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách thiết bị:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách thiết bị',
        error: error.message
      });
    }
  }

  // Lấy thông tin chi tiết một thiết bị
  static async getThietBiById(req, res) {
    try {
      const { id } = req.params;

      const thietBi = await NguoiDung.findByPk(id, {
        include: [
          {
            model: TreEm,
            as: 'treEm',
            attributes: ['ma_tre_em', 'ten_tre', 'lop', 'gioi_tinh']
          },
          {
            model: GoiDichVu,
            as: 'goiDichVuList',
            include: [{
              model: ThongTinGoi,
              as: 'thongTinGoi',
              attributes: ['id', 'ten', 'gia', 'loai_goi', 'thoi_han_thang']
            }],
            order: [['ngay_bat_dau', 'DESC']]
          }
        ]
      });

      if (!thietBi) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy thiết bị'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Lấy thông tin thiết bị thành công',
        data: thietBi
      });
    } catch (error) {
      console.error('Lỗi khi lấy thông tin thiết bị:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy thông tin thiết bị',
        error: error.message
      });
    }
  }

  // Tạo thiết bị mới
  static async createThietBi(req, res) {
    try {
      const { ma_tre_em, ma_thiet_bi, loai_thiet_bi, ten_thiet_bi } = req.body;

      // Kiểm tra trẻ em có tồn tại không
      const treEm = await TreEm.findByPk(ma_tre_em);
      if (!treEm) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy trẻ em'
        });
      }

      // Kiểm tra mã thiết bị đã tồn tại chưa
      if (ma_thiet_bi) {
        const existingDevice = await NguoiDung.findOne({
          where: { ma_thiet_bi: ma_thiet_bi }
        });
        
        if (existingDevice) {
          return res.status(400).json({
            success: false,
            message: 'Mã thiết bị đã tồn tại trong hệ thống'
          });
        }
      }

      // Tạo ID người dùng mới
      const nguoiDungId = uuidv4();

      const newThietBi = await NguoiDung.create({
        nguoi_dung_id: nguoiDungId,
        ma_tre_em,
        ma_thiet_bi,
        loai_thiet_bi,
        ten_thiet_bi
      });

      // Lấy thông tin đầy đủ sau khi tạo
      const thietBiWithDetails = await NguoiDung.findByPk(nguoiDungId, {
        include: [{
          model: TreEm,
          as: 'treEm',
          attributes: ['ma_tre_em', 'ten_tre', 'lop']
        }]
      });

      res.status(201).json({
        success: true,
        message: 'Tạo thiết bị thành công',
        data: thietBiWithDetails
      });
    } catch (error) {
      console.error('Lỗi khi tạo thiết bị:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi tạo thiết bị',
        error: error.message
      });
    }
  }

  // Cập nhật thông tin thiết bị
  static async updateThietBi(req, res) {
    try {
      const { id } = req.params;
      const { ma_thiet_bi, loai_thiet_bi, ten_thiet_bi } = req.body;

      const thietBi = await NguoiDung.findByPk(id);
      if (!thietBi) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy thiết bị'
        });
      }

      // Kiểm tra mã thiết bị đã tồn tại chưa (nếu có thay đổi)
      if (ma_thiet_bi && ma_thiet_bi !== thietBi.ma_thiet_bi) {
        const existingDevice = await NguoiDung.findOne({
          where: { 
            ma_thiet_bi: ma_thiet_bi,
            nguoi_dung_id: { [require('sequelize').Op.ne]: id } // Loại trừ thiết bị hiện tại
          }
        });
        
        if (existingDevice) {
          return res.status(400).json({
            success: false,
            message: 'Mã thiết bị đã tồn tại trong hệ thống'
          });
        }
      }

      // Cập nhật thông tin
      const updateData = {};
      if (ma_thiet_bi) updateData.ma_thiet_bi = ma_thiet_bi;
      if (loai_thiet_bi) updateData.loai_thiet_bi = loai_thiet_bi;
      if (ten_thiet_bi) updateData.ten_thiet_bi = ten_thiet_bi;

      await thietBi.update(updateData);

      // Lấy thông tin đã cập nhật
      const updatedThietBi = await NguoiDung.findByPk(id, {
        include: [{
          model: TreEm,
          as: 'treEm',
          attributes: ['ma_tre_em', 'ten_tre', 'lop']
        }]
      });

      res.status(200).json({
        success: true,
        message: 'Cập nhật thông tin thiết bị thành công',
        data: updatedThietBi
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật thiết bị:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi cập nhật thiết bị',
        error: error.message
      });
    }
  }

  // Xóa thiết bị
  static async deleteThietBi(req, res) {
    const transaction = await sequelize.transaction();
    
    try {
      const { id } = req.params;

      const thietBi = await NguoiDung.findByPk(id);
      if (!thietBi) {
        await transaction.rollback();
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy thiết bị'
        });
      }

      // Xóa tất cả dữ liệu liên quan đến thiết bị
      await deleteSingleDeviceData(id, transaction);

      // Xóa thiết bị
      await thietBi.destroy({ transaction });

      // Commit transaction
      await transaction.commit();

      res.status(200).json({
        success: true,
        message: 'Xóa thiết bị và tất cả dữ liệu liên quan thành công'
      });
    } catch (error) {
      await transaction.rollback();
      console.error('Lỗi khi xóa thiết bị:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi xóa thiết bị',
        error: error.message
      });
    }
  }

  // Thay đổi gói dịch vụ cho thiết bị
  static async changeGoiDichVu(req, res) {
    try {
      const { thietBiId } = req.params;
      const { thong_tin_goi_id } = req.body;

      // Kiểm tra thiết bị có tồn tại không
      const thietBi = await NguoiDung.findByPk(thietBiId);
      if (!thietBi) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy thiết bị'
        });
      }

      // Kiểm tra gói dịch vụ có tồn tại không
      const thongTinGoi = await ThongTinGoi.findByPk(thong_tin_goi_id);
      if (!thongTinGoi) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy gói dịch vụ'
        });
      }

      // Hủy các gói đang hoạt động: cập nhật ngày kết thúc = hiện tại, trạng thái = 'HUY'
      const now = new Date();
      await GoiDichVu.update(
        { trang_thai: 'HUY', ngay_ket_thuc: now },
        {
          where: {
            nguoi_dung_id: thietBiId,
            trang_thai: 'DANG_HOAT_DONG'
          }
        }
      );

      // Tạo gói dịch vụ mới
      const ngayBatDau = new Date();
      const ngayKetThuc = new Date();
      ngayKetThuc.setMonth(ngayKetThuc.getMonth() + thongTinGoi.thoi_han_thang);
      
      console.log('Creating GoiDichVu with:', {
        nguoi_dung_id: thietBiId,
        ma_thiet_bi: thietBi.ma_thiet_bi,
        thong_tin_goi_id,
        ngay_bat_dau: ngayBatDau,
        ngay_ket_thuc: ngayKetThuc,
        gia: thongTinGoi.gia,
        trang_thai: 'DANG_HOAT_DONG'
      });

      const newGoiDichVu = await GoiDichVu.create({
        nguoi_dung_id: thietBiId,
        ma_thiet_bi: thietBi.ma_thiet_bi,
        thong_tin_goi_id,
        ngay_bat_dau: ngayBatDau,
        ngay_ket_thuc: ngayKetThuc,
        gia: thongTinGoi.gia,
        trang_thai: 'DANG_HOAT_DONG'
      }, {
        validate: false
      });

      // Lấy thông tin đầy đủ
      const thietBiWithGoi = await NguoiDung.findByPk(thietBiId, {
        include: [
          {
            model: TreEm,
            as: 'treEm',
            attributes: ['ma_tre_em', 'ten_tre', 'lop']
          },
          {
            model: GoiDichVu,
            as: 'goiDichVuList',
            where: { trang_thai: 'DANG_HOAT_DONG' },
            include: [{
              model: ThongTinGoi,
              as: 'thongTinGoi',
              attributes: ['id', 'ten', 'gia', 'loai_goi', 'thoi_han_thang']
            }]
          }
        ]
      });

      res.status(200).json({
        success: true,
        message: 'Thay đổi gói dịch vụ thành công',
        data: thietBiWithGoi
      });
    } catch (error) {
      console.error('Lỗi khi thay đổi gói dịch vụ:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        thietBiId: req.params.thietBiId,
        body: req.body
      });
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi thay đổi gói dịch vụ',
        error: error.message
      });
    }
  }

  // Lấy lịch sử gói dịch vụ của thiết bị
  static async getLichSuGoiDichVu(req, res) {
    try {
      const { thietBiId } = req.params;

      const lichSuGoi = await GoiDichVu.findAll({
        where: { nguoi_dung_id: thietBiId },
        include: [{
          model: ThongTinGoi,
          as: 'thongTinGoi',
          attributes: ['id', 'ten', 'gia', 'loai_goi', 'thoi_han_thang']
        }],
        order: [['ngay_bat_dau', 'DESC']]
      });

      res.status(200).json({
        success: true,
        message: 'Lấy lịch sử gói dịch vụ thành công',
        data: lichSuGoi
      });
    } catch (error) {
      console.error('Lỗi khi lấy lịch sử gói dịch vụ:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy lịch sử gói dịch vụ',
        error: error.message
      });
    }
  }

  // Lấy tất cả dữ liệu drill-down: Phụ huynh → Trẻ em → Thiết bị + Gói
  static async getDrillDownData(req, res) {
    try {
      const { PhuHuynh, TreEm } = require('../models');
      
      // Lấy tất cả phụ huynh với trẻ em và thiết bị
      const phuHuynhList = await PhuHuynh.findAll({
        include: [
          {
            model: TreEm,
            as: 'treEmList',
            include: [
              {
                model: NguoiDung,
                as: 'thietBiList',
                include: [
                  {
                    model: GoiDichVu,
                    as: 'goiDichVuList',
                    required: false,
                    include: [{
                      model: ThongTinGoi,
                      as: 'thongTinGoi',
                      attributes: ['id', 'ten', 'gia', 'loai_goi', 'thoi_han_thang', 'mo_ta']
                    }],
                    order: [['ngay_bat_dau', 'DESC']]
                  }
                ],
                order: [['ngay_tao', 'DESC']]
              }
            ],
            order: [['ngay_tao', 'DESC']]
          }
        ],
        order: [['ngay_tao', 'DESC']]
      });

      // Xử lý dữ liệu để hiển thị dạng bảng
      const drillDownData = [];
      
      phuHuynhList.forEach(phuHuynh => {
        if (phuHuynh.treEmList && phuHuynh.treEmList.length > 0) {
          phuHuynh.treEmList.forEach(treEm => {
            if (treEm.thietBiList && treEm.thietBiList.length > 0) {
              treEm.thietBiList.forEach(thietBi => {
                const activeGoi = thietBi.goiDichVuList?.find(goi => goi.trang_thai === 'DANG_HOAT_DONG');
                
                drillDownData.push({
                  // Thông tin phụ huynh
                  phuHuynhId: phuHuynh.ma_phu_huynh,
                  phuHuynhTen: phuHuynh.ten_phu_huynh || 'Chưa cập nhật',
                  phuHuynhEmail: phuHuynh.email_phu_huynh,
                  phuHuynhSdt: phuHuynh.sdt || 'Chưa cập nhật',
                  
                  // Thông tin trẻ em
                  treEmId: treEm.ma_tre_em,
                  treEmTen: treEm.ten_tre,
                  treEmLop: treEm.lop || 'Chưa cập nhật',
                  treEmGioiTinh: treEm.gioi_tinh || 'Chưa cập nhật',
                  treEmTruong: treEm.truong || 'Chưa cập nhật',
                  
                  // Thông tin thiết bị
                  thietBiId: thietBi.nguoi_dung_id,
                  thietBiTen: thietBi.ten_thiet_bi || 'Chưa đặt tên',
                  thietBiLoai: thietBi.loai_thiet_bi || 'Chưa xác định',
                  thietBiMa: thietBi.ma_thiet_bi || 'Chưa có',
                  thietBiNgayTao: thietBi.ngay_tao,
                  
                  // Thông tin gói
                  goiActive: activeGoi ? {
                    id: activeGoi.id,
                    ten: activeGoi.thongTinGoi?.ten || 'Không xác định',
                    gia: activeGoi.thongTinGoi?.gia || 0,
                    loaiGoi: activeGoi.thongTinGoi?.loai_goi || 'MIEN_PHI',
                    thoiHan: activeGoi.thongTinGoi?.thoi_han_thang || 0,
                    ngayBatDau: activeGoi.ngay_bat_dau,
                    ngayKetThuc: activeGoi.ngay_ket_thuc,
                    trangThai: activeGoi.trang_thai
                  } : null,
                  
                  // Thống kê
                  totalGoi: thietBi.goiDichVuList?.length || 0,
                  goiHistory: thietBi.goiDichVuList || []
                });
              });
            } else {
              // Trẻ em chưa có thiết bị
              drillDownData.push({
                // Thông tin phụ huynh
                phuHuynhId: phuHuynh.ma_phu_huynh,
                phuHuynhTen: phuHuynh.ten_phu_huynh || 'Chưa cập nhật',
                phuHuynhEmail: phuHuynh.email_phu_huynh,
                phuHuynhSdt: phuHuynh.sdt || 'Chưa cập nhật',
                
                // Thông tin trẻ em
                treEmId: treEm.ma_tre_em,
                treEmTen: treEm.ten_tre,
                treEmLop: treEm.lop || 'Chưa cập nhật',
                treEmGioiTinh: treEm.gioi_tinh || 'Chưa cập nhật',
                treEmTruong: treEm.truong || 'Chưa cập nhật',
                
                // Thông tin thiết bị
                thietBiId: null,
                thietBiTen: 'Chưa có thiết bị',
                thietBiLoai: null,
                thietBiMa: null,
                thietBiNgayTao: null,
                
                // Thông tin gói
                goiActive: null,
                totalGoi: 0,
                goiHistory: []
              });
            }
          });
        } else {
          // Phụ huynh chưa có trẻ em
          drillDownData.push({
            // Thông tin phụ huynh
            phuHuynhId: phuHuynh.ma_phu_huynh,
            phuHuynhTen: phuHuynh.ten_phu_huynh || 'Chưa cập nhật',
            phuHuynhEmail: phuHuynh.email_phu_huynh,
            phuHuynhSdt: phuHuynh.sdt || 'Chưa cập nhật',
            
            // Thông tin trẻ em
            treEmId: null,
            treEmTen: 'Chưa có trẻ em',
            treEmLop: null,
            treEmGioiTinh: null,
            treEmTruong: null,
            
            // Thông tin thiết bị
            thietBiId: null,
            thietBiTen: null,
            thietBiLoai: null,
            thietBiMa: null,
            thietBiNgayTao: null,
            
            // Thông tin gói
            goiActive: null,
            totalGoi: 0,
            goiHistory: []
          });
        }
      });

      res.status(200).json({
        success: true,
        message: 'Lấy dữ liệu drill-down thành công',
        data: drillDownData,
        total: drillDownData.length
      });
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu drill-down:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy dữ liệu drill-down',
        error: error.message
      });
    }
  }
}

module.exports = ThietBiController;
