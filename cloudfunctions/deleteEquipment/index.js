// 删除设备云函数
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  console.log('开始执行删除设备云函数，设备ID：', event.id);
  try {
    // 从数据库删除设备
    const result = await db.collection('equipments').doc(event.id).remove()
    console.log('删除设备成功：', result);
    return result
  } catch (error) {
    console.error('删除设备失败：', error);
    throw error
  }
} 