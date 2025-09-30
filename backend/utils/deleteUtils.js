const { sequelize } = require('../models');

/**
 * Xóa tất cả dữ liệu liên quan đến thiết bị
 * @param {Array} thietBiIds - Danh sách ID thiết bị
 * @param {Object} transaction - Sequelize transaction
 */
async function deleteRelatedDeviceData(thietBiIds, transaction) {
  if (!thietBiIds || thietBiIds.length === 0) {
    return;
  }

  const replacements = { thietBiIds };
  
  await Promise.all([
    // Xóa gói dịch vụ
    sequelize.query('DELETE FROM goi_dich_vu WHERE nguoi_dung_id IN (:thietBiIds)', {
      replacements,
      transaction
    }),
    // Xóa cài đặt phần mềm
    sequelize.query('DELETE FROM cai_dat_phan_mem WHERE nguoi_dung_id IN (:thietBiIds)', {
      replacements,
      transaction
    }),
    // Xóa phần mềm cho phép
    sequelize.query('DELETE FROM phan_mem_cho_phep WHERE nguoi_dung_id IN (:thietBiIds)', {
      replacements,
      transaction
    }),
    // Xóa phần mềm trên máy
    sequelize.query('DELETE FROM phan_mem_tren_may_tinh WHERE nguoi_dung_id IN (:thietBiIds)', {
      replacements,
      transaction
    }),
    // Xóa website bị chặn
    sequelize.query('DELETE FROM web_bi_chan WHERE nguoi_dung_id IN (:thietBiIds)', {
      replacements,
      transaction
    }),
    // Xóa website cho phép
    sequelize.query('DELETE FROM web_cho_phep WHERE nguoi_dung_id IN (:thietBiIds)', {
      replacements,
      transaction
    }),
    // Xóa quản lý thời gian
    sequelize.query('DELETE FROM quan_ly_thoi_gian WHERE nguoi_dung_id IN (:thietBiIds)', {
      replacements,
      transaction
    }),
    // Xóa cảnh báo AI
    sequelize.query('DELETE FROM canh_bao_ai WHERE nguoi_dung_id IN (:thietBiIds)', {
      replacements,
      transaction
    }),
    // Xóa yêu cầu truy cập
    sequelize.query('DELETE FROM yeu_cau_truy_cap WHERE nguoi_dung_id IN (:thietBiIds)', {
      replacements,
      transaction
    }),
    // Xóa device tokens
    sequelize.query('DELETE FROM device_tokens WHERE user_id IN (:thietBiIds)', {
      replacements,
      transaction
    }),
    // Xóa lịch sử thanh toán
    sequelize.query('DELETE FROM lich_su_thanh_toan WHERE nguoi_dung_id IN (:thietBiIds)', {
      replacements,
      transaction
    })
  ]);
}

/**
 * Xóa dữ liệu liên quan đến một thiết bị cụ thể
 * @param {string} thietBiId - ID thiết bị
 * @param {Object} transaction - Sequelize transaction
 */
async function deleteSingleDeviceData(thietBiId, transaction) {
  const replacements = { thietBiId };
  
  await Promise.all([
    // Xóa gói dịch vụ
    sequelize.query('DELETE FROM goi_dich_vu WHERE nguoi_dung_id = :thietBiId', {
      replacements,
      transaction
    }),
    // Xóa cài đặt phần mềm
    sequelize.query('DELETE FROM cai_dat_phan_mem WHERE nguoi_dung_id = :thietBiId', {
      replacements,
      transaction
    }),
    // Xóa phần mềm cho phép
    sequelize.query('DELETE FROM phan_mem_cho_phep WHERE nguoi_dung_id = :thietBiId', {
      replacements,
      transaction
    }),
    // Xóa phần mềm trên máy
    sequelize.query('DELETE FROM phan_mem_tren_may_tinh WHERE nguoi_dung_id = :thietBiId', {
      replacements,
      transaction
    }),
    // Xóa website bị chặn
    sequelize.query('DELETE FROM web_bi_chan WHERE nguoi_dung_id = :thietBiId', {
      replacements,
      transaction
    }),
    // Xóa website cho phép
    sequelize.query('DELETE FROM web_cho_phep WHERE nguoi_dung_id = :thietBiId', {
      replacements,
      transaction
    }),
    // Xóa quản lý thời gian
    sequelize.query('DELETE FROM quan_ly_thoi_gian WHERE nguoi_dung_id = :thietBiId', {
      replacements,
      transaction
    }),
    // Xóa cảnh báo AI
    sequelize.query('DELETE FROM canh_bao_ai WHERE nguoi_dung_id = :thietBiId', {
      replacements,
      transaction
    }),
    // Xóa yêu cầu truy cập
    sequelize.query('DELETE FROM yeu_cau_truy_cap WHERE nguoi_dung_id = :thietBiId', {
      replacements,
      transaction
    }),
    // Xóa device tokens
    sequelize.query('DELETE FROM device_tokens WHERE user_id = :thietBiId', {
      replacements,
      transaction
    }),
    // Xóa lịch sử thanh toán
    sequelize.query('DELETE FROM lich_su_thanh_toan WHERE nguoi_dung_id = :thietBiId', {
      replacements,
      transaction
    })
  ]);
}

module.exports = {
  deleteRelatedDeviceData,
  deleteSingleDeviceData
};
