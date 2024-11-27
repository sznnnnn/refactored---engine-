// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { username, password } = event;
  
  // 这里添加你的登录逻辑
  if (username === 'admin' && password === '123456') {
    return {
      code: 0,
      message: '登录成功',
      data: {
        token: 'dummy-token',
        userInfo: {
          username: username,
          role: 'admin'
        }
      }
    };
  }
  
  return {
    code: -1,
    message: '用户名或密码错误'
  };
}