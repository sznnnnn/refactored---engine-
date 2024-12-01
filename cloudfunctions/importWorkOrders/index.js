// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 真实工单数据
const realOrders = [
  {
    orderNumber: 'WO20240301001',
    customerName: '福建某机械有限公司',
    description: '挖掘机液压系统异常，需要检修',
    equipmentType: '挖掘机',
    equipmentModel: 'PC200-8',
    location: '福建省福州市',
    status: 'completed',
    priority: 'high',
    contactPerson: '陈经理',
    contactPhone: '13912345678'
  },
  {
    orderNumber: 'WO20240301002',
    customerName: '厦门港口机械公司',
    description: '装载机发动机启动困难，需要维修',
    equipmentType: '装载机',
    equipmentModel: 'ZL50CN',
    location: '福建省厦门市',
    status: 'processing',
    priority: 'medium',
    contactPerson: '林工',
    contactPhone: '13812345678'
  },
  {
    orderNumber: 'WO20240301003',
    customerName: '泉州建筑工程有限公司',
    description: '推土机履带损坏，需要更换',
    equipmentType: '推土机',
    equipmentModel: 'D85-21',
    location: '福建省泉州市',
    status: 'pending',
    priority: 'normal',
    contactPerson: '王总',
    contactPhone: '13712345678'
  },
  {
    orderNumber: 'WO20240301004',
    customerName: '龙岩矿业集团',
    description: '破碎机轴承过热，需要检查',
    equipmentType: '破碎机',
    equipmentModel: 'PE600x900',
    location: '福建省龙岩市',
    status: 'pending',
    priority: 'high',
    contactPerson: '张工',
    contactPhone: '13612345678'
  },
  {
    orderNumber: 'WO20240301005',
    customerName: '三明重工业公司',
    description: '起重机电气系统故障，需要维修',
    equipmentType: '起重机',
    equipmentModel: 'QY25K5',
    location: '福建省三明市',
    status: 'processing',
    priority: 'high',
    contactPerson: '李经理',
    contactPhone: '13512345678'
  }
]

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 先清空现有数据（可选）
    try {
      const { total } = await db.collection('orders').count()
      if (total > 0) {
        const _ = db.command
        await db.collection('orders').where({
          _id: _.exists(true)
        }).remove()
      }
    } catch (error) {
      console.error('清空数据失败:', error)
    }

    // 添加工单数据
    const tasks = realOrders.map(order => {
      const now = db.serverDate()
      return db.collection('orders').add({
        data: {
          ...order,
          createTime: now,
          updateTime: now,
          // 添加其他默认字段
          engineerId: '',
          engineerName: '',
          completedTime: null,
          remarks: '',
          images: []
        }
      })
    })
    
    await Promise.all(tasks)

    return {
      code: 0,
      message: '导入成功',
      data: {
        count: realOrders.length
      }
    }
  } catch (error) {
    console.error('导入失败:', error)
    return {
      code: -1,
      message: '导入失败',
      error: error.message
    }
  }
} 