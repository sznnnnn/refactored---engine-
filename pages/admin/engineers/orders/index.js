Page({
  data: {
    engineerId: '',
    orders: []
  },

  onLoad(options) {
    const { id } = options
    this.setData({ engineerId: id })
    this.loadOrders(id)
  },

  // 加载工程师的工单
  async loadOrders(engineerId) {
    try {
      wx.showLoading({ title: '加载中' })
      // TODO: 从服务器获取工单数据
      const orders = [
        {
          id: '001',
          orderNumber: 'WO20240318001',
          status: 'processing',
          customerName: '张三',
          createTime: '2024-03-18 10:00'
        }
      ]
      this.setData({ orders })
    } catch (error) {
      console.error('加载失败:', error)
      wx.showToast({
        title: '加载失败',
        icon: 'error'
      })
    } finally {
      wx.hideLoading()
    }
  }
}) 