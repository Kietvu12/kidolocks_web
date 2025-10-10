const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const NguoiDung = sequelize.define('NguoiDung', {
    nguoi_dung_id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
      comment: 'ID người dùng (UUID)'
    },
    ma_thiet_bi: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
      comment: 'Mã thiết bị (duy nhất)'
    },
    ma_tre_em: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tre_em',
        key: 'ma_tre_em'
      },
      comment: 'Mã trẻ em (khóa ngoại)'
    },
    ngay_tao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: 'Ngày tạo tài khoản'
    },
    loai_thiet_bi: {
      type: DataTypes.STRING(30),
      allowNull: true,
      validate: {
        isIn: {
          args: [['Laptop', 'Desktop', 'Tablet', 'Mobile']],
          msg: 'Loại thiết bị không hợp lệ'
        }
      },
      comment: 'Loại thiết bị'
    },
    ten_thiet_bi: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Tên thiết bị phải có từ 1-255 ký tự'
        }
      },
      comment: 'Tên thiết bị'
    }
  }, {
    tableName: 'nguoi_dung',
    timestamps: false,
    indexes: [
      {
        fields: ['ma_tre_em']
      },
      {
        fields: ['ma_thiet_bi'],
        unique: true
      },
      {
        fields: ['loai_thiet_bi']
      }
    ],
    hooks: {
      beforeCreate: (nguoiDung) => {
        console.log('Tạo người dùng mới:', nguoiDung.ten_thiet_bi);
      }
    }
  });

  // Định nghĩa các mối quan hệ
  NguoiDung.associate = (models) => {
    // Một người dùng có thể thuộc về một trẻ em
    NguoiDung.belongsTo(models.TreEm, {
      foreignKey: 'ma_tre_em',
      as: 'treEm',
      onDelete: 'SET NULL'
    });

    // Một người dùng có thể có nhiều gói dịch vụ
    NguoiDung.hasMany(models.GoiDichVu, {
      foreignKey: 'nguoi_dung_id',
      as: 'goiDichVuList',
      onDelete: 'CASCADE'
    });
  };

  return NguoiDung;
};
