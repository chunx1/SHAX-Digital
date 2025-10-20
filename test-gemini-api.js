// 测试 Gemini API Key 是否有效
// 运行方法：node test-gemini-api.js

const API_KEY = 'AIzaSyCxazBrQIyrKyHPyubaYzwv65pDKBuey0U'; // 备用 API Key

async function testAPI() {
  console.log('🔍 测试 Gemini API Key...\n');
  
  // 测试 1: 列出可用模型
  console.log('📋 步骤 1: 获取可用模型列表...');
  try {
    const listResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`
    );
    
    if (!listResponse.ok) {
      const errorData = await listResponse.json();
      console.error('❌ API Key 无效或已过期！');
      console.error('错误信息:', JSON.stringify(errorData, null, 2));
      return;
    }
    
    const modelsData = await listResponse.json();
    console.log('✅ API Key 有效！\n');
    
    console.log('📝 可用的模型：');
    if (modelsData.models && modelsData.models.length > 0) {
      modelsData.models.forEach((model, index) => {
        console.log(`${index + 1}. ${model.name}`);
        console.log(`   显示名称: ${model.displayName}`);
        console.log(`   支持的方法: ${model.supportedGenerationMethods?.join(', ')}`);
        console.log('');
      });
      
      // 测试 2: 尝试使用第一个支持 generateContent 的模型
      const generateModel = modelsData.models.find(m => 
        m.supportedGenerationMethods?.includes('generateContent')
      );
      
      if (generateModel) {
        console.log(`\n🧪 步骤 2: 测试模型 ${generateModel.name}...\n`);
        
        const testResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1/${generateModel.name}:generateContent?key=${API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: '你好，请说"测试成功"' }]
              }]
            })
          }
        );
        
        if (testResponse.ok) {
          const data = await testResponse.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          console.log('✅ 测试成功！');
          console.log('AI 回复:', reply);
          console.log('\n🎉 推荐使用的模型名称:', generateModel.name);
        } else {
          const errorData = await testResponse.json();
          console.error('❌ 测试失败:', JSON.stringify(errorData, null, 2));
        }
      }
    } else {
      console.log('❌ 没有找到可用的模型！');
    }
    
  } catch (error) {
    console.error('❌ 发生错误:', error.message);
  }
}

testAPI();

