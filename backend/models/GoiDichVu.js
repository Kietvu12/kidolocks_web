const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const GoiDichVu = sequelize.define('GoiDichVu', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'ID gói dịch vụ người dùng'
    },
    ma_thiet_bi: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'Mã thiết bị'
    },
    nguoi_dung_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'nguoi_dung',
        key: 'nguoi_dung_id'
      },
      comment: 'ID người dùng (khóa ngoại)'
    },
    ngay_bat_dau: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'Ngày bắt đầu không hợp lệ'
        }
      },
      comment: 'Ngày bắt đầu sử dụng gói'
    },
    ngay_ket_thuc: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: {
          msg: 'Ngày kết thúc không hợp lệ'
        }
      },
      comment: 'Ngày kết thúc gói'
    },
    gia: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: {
          args: [0],
          msg: 'Giá phải lớn hơn hoặc bằng 0'
        }
      },
      comment: 'Giá gói đã mua'
    },
    trang_thai: {
      type: DataTypes.ENUM('DANG_HOAT_DONG', 'HET_HAN', 'HUY'),
      allowNull: false,
      defaultValue: 'DANG_HOAT_DONG',
      comment: 'Trạng thái gói dịch vụ'
    },
    phuong_thuc_thanh_toan: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'Phương thức thanh toán'
    },
    ma_giao_dich: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
      comment: 'Mã giao dịch thanh toán'
    },
    thong_tin_goi_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'thong_tin_goi',
        key: 'id'
      },
      comment: 'ID gói dịch vụ (khóa ngoại)'
    }
  }, {
    tableName: 'goi_dich_vu',
    timestamps: false,
    indexes: [
      {
        fields: ['nguoi_dung_id']
      },
      {
        fields: ['thong_tin_goi_id']
      },
      {
        fields: ['trang_thai']
      },
      {
        unique: true,
        fields: ['ma_giao_dich']
      }
    ],
    hooks: {
      beforeCreate: (goiDichVu) => {
        console.log('Tạo gói dịch vụ mới cho người dùng:', goiDichVu.nguoi_dung_id);
      },
      beforeUpdate: (goiDichVu) => {
        // Tự động cập nhật trạng thái nếu hết hạn
        if (goiDichVu.ngay_ket_thuc && new Date(goiDichVu.ngay_ket_thuc) < new Date()) {
          goiDichVu.trang_thai = 'HET_HAN';
        }
      }
    }
  });

  // Định nghĩa các mối quan hệ
  GoiDichVu.associate = (models) => {
    // Một gói dịch vụ thuộc về một người dùng
    GoiDichVu.belongsTo(models.NguoiDung, {
      foreignKey: 'nguoi_dung_id',
      as: 'nguoiDung',
      onDelete: 'CASCADE'
    });

    // Một gói dịch vụ thuộc về một gói thông tin
    GoiDichVu.belongsTo(models.ThongTinGoi, {
      foreignKey: 'thong_tin_goi_id',
      as: 'thongTinGoi',
      onDelete: 'CASCADE'
    });
  };

  return GoiDichVu;
};
