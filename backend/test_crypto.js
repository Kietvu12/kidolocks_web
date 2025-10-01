const { passwordEncrypt, passwordDecrypt } = require('./utils/cryptoHelper');

// Test mã hóa và giải mã
console.log('=== TEST MÃ HÓA/GIẢI MÃ MẬT KHẨU ===\n');

const testPassword = 'Nhutran@0410';
const key = 'kidlock_key_2024';

console.log('Mật khẩu gốc:', testPassword);
console.log('Khóa mã hóa:', key);

// Mã hóa
const encrypted = passwordEncrypt(testPassword, key);
console.log('\nMật khẩu đã mã hóa:', encrypted);

// Giải mã
const decrypted = passwordDecrypt(encrypted, key);
console.log('Mật khẩu đã giải mã:', decrypted);

// Kiểm tra kết quả
console.log('\n=== KẾT QUẢ ===');
console.log('Mật khẩu gốc === Mật khẩu giải mã:', testPassword === decrypted);
console.log('Mã hóa thành công:', encrypted !== testPassword);
console.log('Giải mã thành công:', decrypted === testPassword);

// Test với mật khẩu khác
console.log('\n=== TEST VỚI MẬT KHẨU KHÁC ===');
const testPassword2 = 'Test123!@#';
const encrypted2 = passwordEncrypt(testPassword2, key);
const decrypted2 = passwordDecrypt(encrypted2, key);

console.log('Mật khẩu gốc:', testPassword2);
console.log('Mật khẩu đã mã hóa:', encrypted2);
console.log('Mật khẩu đã giải mã:', decrypted2);
console.log('Kết quả:', testPassword2 === decrypted2);
