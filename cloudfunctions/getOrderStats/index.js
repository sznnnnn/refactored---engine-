// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const [
      totalCount,
      pendingCount,
      processingCount,
      completedCount
    ] = await Promise.all([
      db.collection('orders').count(),
      db.collection('orders').where({ status: 'pending' }).count(),
      db.collection('orders').where({ status: 'processing' }).count(),
      db.collection('orders').where({ status: 'completed' }).count()
    ])

    return {
      code: 0,
      data: {
        total: totalCount.total,
        pending: pendingCount.total,
        processing: processingCount.total,
        completed: completedCount.total
      }
    }
  } catch (error) {
    console.error(error)
    return {
      code: -1,
      message: '获取统计数据失败'
    }
  }
} 