// 添加设备云函数
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  console.log('开始执行添加设备云函数，接收数据：', event);
  try {
    // 添加设备到数据库
    const result = await db.collection('equipments').add({
      data: event
    })
    console.log('添加设备成功：', result);
    return result
  } catch (error) {
    console.error('添加设备失败：', error);
    throw error
  }
} 