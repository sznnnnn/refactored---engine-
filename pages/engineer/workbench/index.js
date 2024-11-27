Page({
  data: {
    keyword: '',
    stats: {
      todayCount: 0,
      weekCount: 0,
      monthCount: 0
    }
  },

  onLoad() {
    this.loadStats()
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

  // 加载统计数据
  loadStats() {
    // TODO: 从服务器获取统计数据
    this.setData({
      stats: {
        todayCount: 5,
        weekCount: 23,
        monthCount: 89
      }
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
  }
}) 