Page({
  data: {
    keyword: '',
    todayOrders: [
      {
        id: '001',
        orderNo: 'WO20231127001',
        status: 'processing',
        statusText: '进行中',
        customer: '余卫才',
        equipment: '660F 0300',
        issue: '打不着火',
        appointTime: '10:30'
      },
      {
        id: '002',
        orderNo: 'WO20231127002',
        status: 'pending',
        statusText: '待处理',
        customer: '张三机械厂',
        equipment: '1100F',
        issue: '液压系统异常',
        appointTime: '14:00'
      }
    ],
    grabOrders: [
      {
        id: '003',
        orderNo: 'WO20231127003',
        customer: '李四工程',
        equipment: '220F',
        issue: '启动困难',
        distance: '3.2'
      },
      {
        id: '004',
        orderNo: 'WO20231127004',
        customer: '王五建设',
        equipment: '330F',
        issue: '制动系统异响',
        distance: '5.1'
      }
    ]
  },

  onLoad() {
  },

  // 搜索输入处理
  onSearchInput(e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  // 搜索确认
  onSearch() {
    const { keyword } = this.data
    if (!keyword.trim()) {
      return wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      })
    }
    
    // 直接跳转到历史查询页面并传入搜索关键词
    wx.navigateTo({
      url: `/pages/engineer/history/index?keyword=${encodeURIComponent(keyword)}`
    })
  },

  // 抢单
  onGrabOrder() {
    wx.navigateTo({
      url: '/pages/engineer/grab-orders/index'
    })
  },

  // 历史查询
  onHistorySearch() {
    wx.navigateTo({
      url: '/pages/engineer/history/index'
    })
  },

  // 查看全部今日工单
  viewAllToday() {
    wx.switchTab({
      url: '/pages/engineer/order/index'
    })
  },

  // 查看全部可抢工单
  viewAllGrab() {
    wx.navigateTo({
      url: '/pages/engineer/grab-orders/index'
    })
  },

  // 添加订单
  onAddOrder() {
    wx.navigateTo({
      url: '/pages/engineer/order-add/index'
    })
  },

  // 抢单
  grabOrder(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({
      title: '确认抢单',
      content: '是否确认抢此工单？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '处理中' })
          // TODO: 调用抢单接口
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '抢单成功',
              icon: 'success'
            })
            // 更新列表
            const grabOrders = this.data.grabOrders.filter(order => order.id !== id)
            this.setData({ grabOrders })
          }, 1000)
        }
      }
    })
  }
}) 