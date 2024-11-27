// 验证工程师身份的云函数
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'my-app-dev-4gmyfe9h6ae04648'
})

const db = cloud.database()

exports.main = async (event, context) => {
  console.log('收到验证请求，手机号：', event.phone);
  
  try {
    // 查询工程师信息
    const { data } = await db.collection('engineers')
      .where({
        phone: event.phone
      })
      .get();
    
    console.log('查询结果：', data);
    
    // 如果找到工程师
    if (data && data.length > 0) {
      const engineer = data[0];
      console.log('工程师验证成功：', engineer.name);
      
      return {
        verified: true,
        engineer: {
          name: engineer.name,
          level: engineer.level,
          type: engineer.type
        }
      };
    }
    
    // 未找到工程师
    console.log('未找到对应工程师');
    return {
      verified: false,
      engineer: null
    };
  } catch (error) {
    console.error('查询失败：', error);
    return {
      verified: false,
      error: error.message
    };
  }
};