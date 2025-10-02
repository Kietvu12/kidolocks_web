const axios = require('axios');

// SpeedSMS API configuration
const SPEEDSMS_API_TOKEN = process.env.SPEEDSMS_API_TOKEN || 'L5CSaUvyf9gW38qz7HPnCZLUjASwft-J';

/**
 * SpeedSMS API class theo đúng mẫu exemple.groovy
 */
class SpeedSMSAPI {
  constructor(apiToken) {
    this.apiToken = apiToken;
  }

  /**
   * Gửi SMS theo đúng mẫu exemple.groovy
   */
  async sendSMS(phone, content, type, sender) {
    try {
      console.log('=== SpeedSMS API Request ===');
      console.log('Phone:', phone);
      console.log('Content:', content);
      console.log('Type:', type);
      console.log('Sender:', sender);
      console.log('API Token:', this.apiToken);
      
      const formData = new URLSearchParams();
      formData.append('to', phone);
      formData.append('content', content);
      formData.append('type', type);
      formData.append('sender', sender);

      console.log('Form Data:', formData.toString());

      const response = await axios.post('https://api.speedsms.vn/index.php/sms/send', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: this.apiToken,
          password: 'x'
        }
      });
      
      console.log('=== SpeedSMS API Response ===');
      console.log('Status:', response.status);
      console.log('Data:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('=== SpeedSMS API Error ===');
      console.error('Error message:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
      }
      if (error.request) {
        console.error('Request:', error.request);
      }
      throw error;
    }
  }
}

// Tạo instance theo đúng mẫu
const api = new SpeedSMSAPI(SPEEDSMS_API_TOKEN);

/**
 * Tạo mã OTP ngẫu nhiên
 */
function generateOTP(length = 6) {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}

/**
 * Gửi OTP cho đăng ký - chỉ cần gọi API SpeedSMS
 */
async function sendRegistrationOTP(phone) {
  try {
    console.log('=== Starting sendRegistrationOTP ===');
    console.log('Input phone:', phone);
    
    const otp = generateOTP(6);
    console.log('Generated OTP:', otp);
    
    // Format số điện thoại
    let formattedPhone = phone;
    if (!phone.startsWith('84')) {
      formattedPhone = '84' + phone.replace(/^0/, '');
    }
    console.log('Formatted phone:', formattedPhone);
    
    // Tạo content với OTP
    const content = `Ma xac thuc SPEEDSMS.VN cua ban la ${otp}`;
    const type = 3; // brandname mặc định
    const sender = "SPEEDSMS.VN";
    
    console.log('Content:', content);
    console.log('Type:', type);
    console.log('Sender:', sender);
    
    // Gọi API SpeedSMS theo đúng mẫu
    const response = await api.sendSMS(formattedPhone, content, type, sender);
    console.log('=== Final SpeedSMS response ===');
    console.log('Response:', response);
    
    // Trả về OTP để lưu vào database
    const result = {
      success: response.status === 'success',
      otp: response.status === 'success' ? otp : null,
      data: response
    };
    
    console.log('=== Final result ===');
    console.log('Result:', result);
    
    return result;
  } catch (error) {
    console.error('=== Error in sendRegistrationOTP ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return {
      success: false,
      otp: null,
      error: error.message
    };
  }
}


/**
 * Gửi OTP cho reset password
 */
async function sendResetPasswordOTP(phone) {
  try {
    console.log('=== Starting sendResetPasswordOTP ===');
    console.log('Input phone:', phone);
    
    const otp = generateOTP(6);
    console.log('Generated OTP:', otp);
    
    // Format số điện thoại
    let formattedPhone = phone;
    if (!phone.startsWith('84')) {
      formattedPhone = '84' + phone.replace(/^0/, '');
    }
    console.log('Formatted phone:', formattedPhone);
    
    // Tạo content với OTP
    const content = `Ma xac thuc SPEEDSMS.VN cua ban la ${otp}`;
    const type = 3; // brandname mặc định
    const sender = "SPEEDSMS.VN";
    
    console.log('Content:', content);
    
    // Gọi API SpeedSMS
    const response = await api.sendSMS(formattedPhone, content, type, sender);
    console.log('=== SpeedSMS response ===');
    console.log('Response:', response);
    
    // Trả về OTP để lưu vào database
    const result = {
      success: response.status === 'success',
      otp: response.status === 'success' ? otp : null,
      data: response
    };
    
    console.log('=== Final result ===');
    console.log('Result:', result);
    
    return result;
  } catch (error) {
    console.error('=== Error in sendResetPasswordOTP ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return {
      success: false,
      otp: null,
      error: error.message
    };
  }
}

module.exports = {
  SpeedSMSAPI,
  api,
  generateOTP,
  sendRegistrationOTP,
  sendResetPasswordOTP
};