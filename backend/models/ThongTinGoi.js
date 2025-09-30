const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ThongTinGoi = sequelize.define('ThongTinGoi', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'ID gói dịch vụ'
    },
    ten: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Tên gói không được để trống'
        },
        len: {
          args: [1, 255],
          msg: 'Tên gói phải có từ 1-255 ký tự'
        }
      },
      comment: 'Tên gói dịch vụ'
    },
    mo_ta: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Mô tả gói dịch vụ'
    },
    gia: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Giá phải lớn hơn hoặc bằng 0'
        }
      },
      comment: 'Giá gói dịch vụ'
    },
    loai_goi: {
      type: DataTypes.ENUM('TRA_PHI', 'MIEN_PHI'),
      allowNull: false,
      comment: 'Loại gói (trả phí hoặc miễn phí)'
    },
    thoi_han_thang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: {
          args: [1],
          msg: 'Thời hạn phải ít nhất 1 tháng'
        }
      },
      comment: 'Thời hạn gói (tháng)'
    }
  }, {
    tableName: 'thong_tin_goi',
    timestamps: false,
    indexes: [
      {
        fields: ['loai_goi']
      },
      {
        fields: ['gia']
      }
    ],
    hooks: {
      beforeCreate: (thongTinGoi) => {
        console.log('Tạo gói dịch vụ mới:', thongTinGoi.ten);
      }
    }
  });

  // Định nghĩa các mối quan hệ
  ThongTinGoi.associate = (models) => {
    // Một gói có thể có nhiều nội dung
    ThongTinGoi.hasMany(models.NoiDungGoi, {
      foreignKey: 'thong_tin_goi_id',
      as: 'noiDungList',
      onDelete: 'CASCADE'
    });

    // Một gói có thể được sử dụng bởi nhiều người dùng
    ThongTinGoi.hasMany(models.GoiDichVu, {
      foreignKey: 'thong_tin_goi_id',
      as: 'goiDichVuList',
      onDelete: 'CASCADE'
    });
  };

  return ThongTinGoi;
};
