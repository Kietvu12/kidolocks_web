// Test file để kiểm tra dịch vụ dịch thuật
// Chạy trong browser console để test

const testTranslation = async () => {
  try {
    console.log('Testing translation service...');
    
    // Test API key
    const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
    console.log('API Key:', apiKey ? 'Configured' : 'Not configured');
    
    if (!apiKey || apiKey === 'your_google_translate_api_key_here') {
      console.warn('Please configure VITE_GOOGLE_TRANSLATE_API_KEY in .env file');
      return;
    }
    
    // Test single translation
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: 'Xin chào',
        source: 'vi',
        target: 'en',
        format: 'text'
      })
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    const translation = data.data.translations[0].translatedText;
    
    console.log('✅ Single translation test passed!');
    console.log('Vietnamese:', 'Xin chào');
    console.log('English:', translation);
    
    // Test batch translation
    const batchResponse = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: ['Cảm ơn', 'Tạm biệt'],
        source: 'vi',
        target: 'en',
        format: 'text'
      })
    });
    
    if (!batchResponse.ok) {
      throw new Error(`Batch API Error: ${batchResponse.status}`);
    }
    
    const batchData = await batchResponse.json();
    const batchTranslations = batchData.data.translations.map(t => t.translatedText);
    
    console.log('✅ Batch translation test passed!');
    console.log('Vietnamese:', ['Cảm ơn', 'Tạm biệt']);
    console.log('English:', batchTranslations);
    
  } catch (error) {
    console.error('❌ Translation test failed:', error);
  }
};

// Export để sử dụng trong component
export { testTranslation };

// Auto-run test nếu trong development
if (import.meta.env.DEV) {
  console.log('🧪 Running translation test...');
  testTranslation();
}
