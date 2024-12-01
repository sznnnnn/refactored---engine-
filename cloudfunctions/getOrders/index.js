// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { page = 1, pageSize = 10 } = event
  const skip = (page - 1) * pageSize

  try {
    // 获取总数
    const countResult = await db.collection('orders').count()
    const total = countResult.total

    // 获取列表数据
    const { data } = await db.collection('orders')
      .orderBy('createTime', 'desc')
      .skip(skip)
      .limit(pageSize)
      .get()

    return {
      code: 0,
      data: {
        data,
        total,
        page,
        pageSize
      }
    }
  } catch (error) {
    console.error(error)
    return {
      code: -1,
      message: '获取工单列表失败'
    }
  }
} 