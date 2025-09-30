const crypto = require('crypto');

/**
 * Mã hóa mật khẩu theo logic VB.NET
 * @param {string} plainText - Mật khẩu gốc
 * @param {string} key - Khóa mã hóa
 * @returns {string} - Mật khẩu đã mã hóa
 */
function passwordEncrypt(plainText, key) {
  if (!plainText) return '';
  
  try {
    // Chuyển đổi text thành bytes (Unicode encoding)
    const textBytes = Buffer.from(plainText, 'utf16le');
    
    // Tạo salt giống VB.NET: {&H49, &H76, &H61, &H6E, &H20, &H4D, &H65, &H64, &H76, &H65, &H64, &H65, &H76}
    const salt = Buffer.from([0x49, 0x76, 0x61, 0x6E, 0x20, 0x4D, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76]);
    
    // Tạo key và IV từ password và salt (giống Rfc2898DeriveBytes)
    const derivedKey = crypto.pbkdf2Sync(key, salt, 1000, 32, 'sha1');
    const derivedIV = crypto.pbkdf2Sync(key, salt, 1000, 16, 'sha1');
    
    // Tạo cipher với IV
    const cipher = crypto.createCipheriv('aes-256-cbc', derivedKey, derivedIV);
    
    // Mã hóa
    let encrypted = cipher.update(textBytes, null, 'base64');
    encrypted += cipher.final('base64');
    
    return encrypted;
  } catch (error) {
    console.error('Lỗi khi mã hóa:', error);
    return '';
  }
}

/**
 * Giải mã mật khẩu theo logic VB.NET
 * @param {string} encryptedText - Mật khẩu đã mã hóa
 * @param {string} key - Khóa giải mã
 * @returns {string} - Mật khẩu gốc
 */
function passwordDecrypt(encryptedText, key) {
  if (!encryptedText || encryptedText === '0') return '';
  
  try {
    // Thay thế dấu cách bằng dấu + (giống VB.NET)
    encryptedText = encryptedText.replace(/ /g, '+');
    
    // Chuyển đổi từ base64
    const encryptedBytes = Buffer.from(encryptedText, 'base64');
    
    // Tạo salt giống VB.NET
    const salt = Buffer.from([0x49, 0x76, 0x61, 0x6E, 0x20, 0x4D, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76]);
    
    // Tạo key và IV từ password và salt
    const derivedKey = crypto.pbkdf2Sync(key, salt, 1000, 32, 'sha1');
    const derivedIV = crypto.pbkdf2Sync(key, salt, 1000, 16, 'sha1');
    
    // Tạo decipher với IV
    const decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey, derivedIV);
    
    // Giải mã
    let decrypted = decipher.update(encryptedBytes, null, 'utf16le');
    decrypted += decipher.final('utf16le');
    
    return decrypted;
  } catch (error) {
    console.error('Lỗi khi giải mã:', error);
    return '';
  }
}

module.exports = {
  passwordEncrypt,
  passwordDecrypt
};
