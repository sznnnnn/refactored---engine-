// 获取设备列表云函数
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  console.log('开始执行获取设备列表云函数');
  try {
    // 从数据库获取设备列表
    const result = await db.collection('equipments').get()
    console.log('获取设备列表成功：', result.data);
    return result.data
  } catch (error) {
    console.error('获取设备列表失败：', error);
    throw error
  }
} 