// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { orderData } = event

  try {
    // 生成工单号
    const date = new Date()
    const orderNumber = `WO${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`

    // 添加工单
    const result = await db.collection('orders').add({
      data: {
        ...orderData,
        orderNumber,
        status: 'pending',
        createTime: db.serverDate(),
        updateTime: db.serverDate()
      }
    })

    return {
      code: 0,
      data: {
        _id: result._id,
        orderNumber
      }
    }
  } catch (error) {
    console.error(error)
    return {
      code: -1,
      message: '创建工单失败'
    }
  }
} 