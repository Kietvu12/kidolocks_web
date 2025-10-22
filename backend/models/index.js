const { Sequelize } = require('sequelize');

// Cấu hình kết nối database
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'kidolocks',
  username: process.env.DB_USER || 'mcp',
  password: process.env.DB_PASSWORD || 'ZKdP9LAL8QSAvsE@',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    timestamps: false
  }
});

// Import các model
const PhuHuynh = require('./PhuHuynh')(sequelize);
const TreEm = require('./TreEm')(sequelize);
const ThongTinGoi = require('./ThongTinGoi')(sequelize);
const NoiDungGoi = require('./NoiDungGoi')(sequelize);
const GoiDichVu = require('./GoiDichVu')(sequelize);
const NguoiDung = require('./NguoiDung')(sequelize);
const OtpVerification = require('./OtpVerification')(sequelize);

// Định nghĩa các mối quan hệ
const models = {
  PhuHuynh,
  TreEm,
  ThongTinGoi,
  NoiDungGoi,
  GoiDichVu,
  NguoiDung,
  OtpVerification
};

// Khởi tạo các mối quan hệ
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Thêm sequelize và Sequelize vào models
models.sequelize = sequelize;
models.Sequelize = Sequelize;

// Hàm kiểm tra kết nối database
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối database thành công!');
  } catch (error) {
    console.error('❌ Không thể kết nối database:', error);
  }
};

// Hàm đồng bộ database
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('✅ Đồng bộ database thành công!');
  } catch (error) {
    console.error('❌ Lỗi đồng bộ database:', error);
  }
};

// Export
module.exports = {
  ...models,
  testConnection,
  syncDatabase
};
