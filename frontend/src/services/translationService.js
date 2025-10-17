// Cache để tránh dịch lại những text đã dịch
const translationCache = new Map();

// Google Translate API endpoint
const GOOGLE_TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

/**
 * Dịch text từ tiếng Việt sang tiếng Anh hoặc ngược lại
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
    
    // Lấy API key từ environment variables
    const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      console.warn('Google Translate API key not configured. Returning original text.');
      return text;
    }

    // Gọi Google Translate API
    const response = await fetch(`${GOOGLE_TRANSLATE_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        format: 'text'
      })
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    const translation = data.data.translations[0].translatedText;

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

    // Nếu không có API key, trả về texts gốc
    const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
    if (!apiKey || apiKey === 'your_api_key_here') {
      console.warn('Google Translate API key not configured. Returning original texts.');
      return texts;
    }

    const sourceLanguage = targetLanguage === 'en' ? 'vi' : 'en';
    
    // Gọi Google Translate API cho batch translation
    const response = await fetch(`${GOOGLE_TRANSLATE_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: texts,
        source: sourceLanguage,
        target: targetLanguage,
        format: 'text'
      })
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    const translations = data.data.translations.map(t => t.translatedText);

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
