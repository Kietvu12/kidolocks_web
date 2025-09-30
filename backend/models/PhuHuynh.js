const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PhuHuynh = sequelize.define('PhuHuynh', {
    ma_phu_huynh: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'Mã phụ huynh'
    },
    email_phu_huynh: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Email không hợp lệ'
        }
      },
      comment: 'Email phụ huynh'
    },
    sdt: {
      type: DataTypes.STRING(15),
      allowNull: true,
      validate: {
        len: {
          args: [10, 15],
          msg: 'Số điện thoại phải có từ 10-15 ký tự'
        }
      },
      comment: 'Số điện thoại'
    },
    ten_phu_huynh: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Tên phụ huynh'
    },
    ngay_tao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: 'Ngày tạo tài khoản'
    },
    mat_khau: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: 'Mật khẩu phải có ít nhất 6 ký tự'
        }
      },
      comment: 'Mật khẩu (đã mã hóa)'
    }
  }, {
    tableName: 'phu_huynh',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['email_phu_huynh']
      }
    ],
    hooks: {
      beforeCreate: (phuHuynh) => {
        // Có thể thêm logic mã hóa mật khẩu ở đây
        console.log('Tạo phụ huynh mới:', phuHuynh.email_phu_huynh);
      }
    }
  });

  // Định nghĩa các mối quan hệ
  PhuHuynh.associate = (models) => {
    // Một phụ huynh có thể có nhiều trẻ em
    PhuHuynh.hasMany(models.TreEm, {
      foreignKey: 'ma_phu_huynh',
      as: 'treEmList',
      onDelete: 'CASCADE'
    });
  };

  return PhuHuynh;
};
