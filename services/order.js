const request = require('../utils/request')

const orderService = {
  // 获取工单列表
  getOrders: async (page = 1, pageSize = 10) => {
    return request('getOrders', { page, pageSize })
  },

  // 获取工单统计数据
  getOrderStats: async () => {
    return request('getOrderStats')
  },

  // 创建工单
  createOrder: async (orderData) => {
    return request('createOrder', orderData)
  }
}

module.exports = orderService
