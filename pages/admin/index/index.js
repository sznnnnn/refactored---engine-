// pages/admin/index/index.js
const app = getApp()

Page({
  data: {
    stats: {
      todayOrders: 12,
      pendingOrders: 5,
      activeEngineers: 8
    },
    recentOrders: [
      {
        id: '001',
        orderNo: 'WO20240318001',
        status: 'pending',
        statusText: '待处理',
        customer: '张三',
        createTime: '10:30'
      },
      {
        id: '002',
        orderNo: 'WO20240318002',
        status: 'processing',
        statusText: '处理中',
        customer: '李四',
        createTime: '09:15'
      }
    ]
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  // 加载数据
  loadData() {
    // TODO: 从服务器获取数据
  },

  // 查看所有工单
  viewAllOrders() {
    wx.switchTab({
      url: '/pages/admin/orders/index'
    })
  }
})