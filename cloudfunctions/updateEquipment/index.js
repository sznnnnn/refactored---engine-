// 更新设备信息云函数
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  console.log('开始执行更新设备云函数，接收数据：', event);
  const { id, ...updateData } = event
  
  try {
    // 更新设备信息
    const result = await db.collection('equipments').doc(id).update({
      data: updateData
    })
    console.log('更新设备成功：', result);
    return result
  } catch (error) {
    console.error('更新设备失败：', error);
    throw error
  }
} 