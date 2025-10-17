// Test file để kiểm tra MyMemory API
// Chạy trong browser console để test

const testMyMemoryAPI = async () => {
  try {
    console.log('🧪 Testing MyMemory API...');
    
    // Test single translation
    const response = await fetch('https://api.mymemory.translated.net/get?q=Xin chào&langpair=vi|en');
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ MyMemory API test passed!');
    console.log('Response:', data);
    console.log('Vietnamese:', 'Xin chào');
    console.log('English:', data.responseData.translatedText);
    
    return data.responseData.translatedText;
    
  } catch (error) {
    console.error('❌ MyMemory API test failed:', error);
    return null;
  }
};

// Test batch translation
const testBatchTranslation = async () => {
  try {
    console.log('🧪 Testing batch translation...');
    
    const texts = ['Xin chào', 'Cảm ơn', 'Tạm biệt'];
    const translations = [];
    
    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=vi|en`);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      translations.push(data.responseData.translatedText);
      
      // Delay để tránh rate limit
      if (i < texts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    console.log('✅ Batch translation test passed!');
    console.log('Vietnamese:', texts);
    console.log('English:', translations);
    
    return translations;
    
  } catch (error) {
    console.error('❌ Batch translation test failed:', error);
    return null;
  }
};

// Export để sử dụng trong component
export { testMyMemoryAPI, testBatchTranslation };

// Auto-run test nếu trong development
if (import.meta.env.DEV) {
  console.log('🧪 Running MyMemory API test...');
  testMyMemoryAPI().then(() => {
    console.log('🧪 Running batch translation test...');
    testBatchTranslation();
  });
}
