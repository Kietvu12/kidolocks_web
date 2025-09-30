const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const NoiDungGoi = sequelize.define('NoiDungGoi', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'ID nội dung gói'
    },
    thong_tin_goi_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'thong_tin_goi',
        key: 'id'
      },
      comment: 'ID gói dịch vụ (khóa ngoại)'
    },
    noi_dung: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Nội dung không được để trống'
        }
      },
      comment: 'Nội dung/tính năng của gói'
    }
  }, {
    tableName: 'noi_dung_goi',
    timestamps: false,
    indexes: [
      {
        fields: ['thong_tin_goi_id']
      }
    ],
    hooks: {
      beforeCreate: (noiDungGoi) => {
        console.log('Tạo nội dung gói mới cho gói ID:', noiDungGoi.thong_tin_goi_id);
      }
    }
  });

  // Định nghĩa các mối quan hệ
  NoiDungGoi.associate = (models) => {
    // Một nội dung thuộc về một gói
    NoiDungGoi.belongsTo(models.ThongTinGoi, {
      foreignKey: 'thong_tin_goi_id',
      as: 'thongTinGoi',
      onDelete: 'CASCADE'
    });
  };

  return NoiDungGoi;
};
