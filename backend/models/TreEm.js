const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TreEm = sequelize.define('TreEm', {
    ma_tre_em: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'Mã trẻ em'
    },
    ma_phu_huynh: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'phu_huynh',
        key: 'ma_phu_huynh'
      },
      comment: 'Mã phụ huynh (khóa ngoại)'
    },
    ten_tre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Tên trẻ em không được để trống'
        },
        len: {
          args: [1, 100],
          msg: 'Tên trẻ em phải có từ 1-100 ký tự'
        }
      },
      comment: 'Tên trẻ em'
    },
    lop: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'Lớp học'
    },
    ngay_sinh: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: {
          msg: 'Ngày sinh không hợp lệ'
        },
        isBefore: {
          args: new Date().toISOString().split('T')[0],
          msg: 'Ngày sinh phải trước ngày hiện tại'
        }
      },
      comment: 'Ngày sinh'
    },
    truong: {
      type: DataTypes.STRING(150),
      allowNull: true,
      comment: 'Trường học'
    },
    gioi_tinh: {
      type: DataTypes.ENUM('Nam', 'Nữ', 'Khác'),
      allowNull: false,
      defaultValue: 'Khác',
      comment: 'Giới tính'
    },
    email_tre_em: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isEmail: {
          msg: 'Email trẻ em không hợp lệ'
        }
      },
      comment: 'Email trẻ em'
    }
  }, {
    tableName: 'tre_em',
    timestamps: false,
    indexes: [
      {
        fields: ['ma_phu_huynh']
      },
      {
        fields: ['ten_tre']
      }
    ],
    hooks: {
      beforeCreate: (treEm) => {
        console.log('Tạo trẻ em mới:', treEm.ten_tre);
      }
    }
  });

  // Định nghĩa các mối quan hệ
  TreEm.associate = (models) => {
    // Một trẻ em thuộc về một phụ huynh
    TreEm.belongsTo(models.PhuHuynh, {
      foreignKey: 'ma_phu_huynh',
      as: 'phuHuynh',
      onDelete: 'CASCADE'
    });

    // Một trẻ em có thể có nhiều thiết bị
    TreEm.hasMany(models.NguoiDung, {
      foreignKey: 'ma_tre_em',
      as: 'thietBiList',
      onDelete: 'CASCADE'
    });
  };

  return TreEm;
};
