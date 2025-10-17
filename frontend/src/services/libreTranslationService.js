// Alternative translation service using MyMemory API (free, CORS-friendly)
// Cache để tránh dịch lại những text đã dịch
const translationCache = new Map();

// MyMemory API endpoint (free, CORS-friendly)
const MYMEMORY_API_URL = 'https://api.mymemory.translated.net/get';

/**
 * Dịch text từ tiếng Việt sang tiếng Anh hoặc ngược lại
 * Sử dụng MyMemory API (miễn phí, hỗ trợ CORS)
 * @param {string} text - Text cần dịch
 * @param {string} targetLanguage - Ngôn ngữ đích ('en' hoặc 'vi')
 * @returns {Promise<string>} - Text đã dịch
 */
export const translateText = async (text, targetLanguage = 'en') => {
  try {
    // Kiểm tra cache trước
    const cacheKey = `${text}_${targetLanguage}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey);
    }

    // Nếu text rỗng hoặc chỉ có khoảng trắng
    if (!text || text.trim() === '') {
      return text;
    }

    // Nếu đã là ngôn ngữ đích thì không cần dịch
    const sourceLanguage = targetLanguage === 'en' ? 'vi' : 'en';
    
    // Gọi MyMemory API (miễn phí, hỗ trợ CORS)
    const response = await fetch(`${MYMEMORY_API_URL}?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`);

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Kiểm tra response status
    if (data.responseStatus !== 200) {
      throw new Error(`Translation failed: ${data.responseStatus}`);
    }

    const translation = data.responseData.translatedText;

    // Lưu vào cache
    translationCache.set(cacheKey, translation);
    
    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    // Trả về text gốc nếu có lỗi
    return text;
  }
};

/**
 * Dịch một mảng các text
 * @param {string[]} texts - Mảng các text cần dịch
 * @param {string} targetLanguage - Ngôn ngữ đích
 * @returns {Promise<string[]>} - Mảng các text đã dịch
 */
export const translateTexts = async (texts, targetLanguage = 'en') => {
  try {
    // Kiểm tra cache trước
    const cacheKey = `batch_${texts.join('|')}_${targetLanguage}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey);
    }

    const sourceLanguage = targetLanguage === 'en' ? 'vi' : 'en';
    
    // Dịch từng text một với delay để tránh rate limit
    const translations = [];
    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      
      // Dịch text
      const translation = await translateText(text, targetLanguage);
      translations.push(translation);
      
      // Delay 100ms giữa các requests để tránh rate limit
      if (i < texts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Lưu vào cache
    translationCache.set(cacheKey, translations);
    
    return translations;
  } catch (error) {
    console.error('Batch translation error:', error);
    return texts; // Trả về texts gốc nếu có lỗi
  }
};

/**
 * Dịch object với các thuộc tính text
 * @param {Object} obj - Object chứa các thuộc tính text
 * @param {string[]} textFields - Mảng tên các field cần dịch
 * @param {string} targetLanguage - Ngôn ngữ đích
 * @returns {Promise<Object>} - Object đã dịch
 */
export const translateObject = async (obj, textFields, targetLanguage = 'en') => {
  try {
    const translatedObj = { ...obj };
    
    for (const field of textFields) {
      if (obj[field] && typeof obj[field] === 'string') {
        translatedObj[field] = await translateText(obj[field], targetLanguage);
      }
    }
    
    return translatedObj;
  } catch (error) {
    console.error('Object translation error:', error);
    return obj; // Trả về object gốc nếu có lỗi
  }
};

/**
 * Dịch mảng các object
 * @param {Object[]} objects - Mảng các object cần dịch
 * @param {string[]} textFields - Mảng tên các field cần dịch
 * @param {string} targetLanguage - Ngôn ngữ đích
 * @returns {Promise<Object[]>} - Mảng các object đã dịch
 */
export const translateObjects = async (objects, textFields, targetLanguage = 'en') => {
  try {
    const translatedObjects = await Promise.all(
      objects.map(obj => translateObject(obj, textFields, targetLanguage))
    );
    return translatedObjects;
  } catch (error) {
    console.error('Objects translation error:', error);
    return objects; // Trả về objects gốc nếu có lỗi
  }
};

/**
 * Hook để sử dụng dịch thuật trong React components
 * @param {string} targetLanguage - Ngôn ngữ đích
 * @returns {Object} - Các function dịch thuật
 */
export const useTranslation = (targetLanguage = 'en') => {
  return {
    translateText: (text) => translateText(text, targetLanguage),
    translateTexts: (texts) => translateTexts(texts, targetLanguage),
    translateObject: (obj, textFields) => translateObject(obj, textFields, targetLanguage),
    translateObjects: (objects, textFields) => translateObjects(objects, textFields, targetLanguage)
  };
};

export default {
  translateText,
  translateTexts,
  translateObject,
  translateObjects,
  useTranslation
};
