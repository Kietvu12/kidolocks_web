const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const OtpVerification = sequelize.define('OtpVerification', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'Mã ID'
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: 'Số điện thoại'
    },
    otp_code: {
      type: DataTypes.STRING(6),
      allowNull: false,
      comment: 'Mã OTP'
    },
    purpose: {
      type: DataTypes.ENUM('registration', 'login', 'reset_password'),
      allowNull: false,
      comment: 'Mục đích sử dụng OTP'
    },
    is_used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: 'Đã sử dụng chưa'
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: 'Thời gian hết hạn'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: 'Thời gian tạo'
    },
    used_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Thời gian sử dụng'
    }
  }, {
    tableName: 'otp_verification',
    timestamps: false,
    indexes: [
      {
        fields: ['phone', 'purpose']
      },
      {
        fields: ['expires_at']
      },
      {
        fields: ['is_used']
      }
    ]
  });

  return OtpVerification;
};
