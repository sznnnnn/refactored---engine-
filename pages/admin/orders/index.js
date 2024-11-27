// pages/admin/orders/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    status: 'all',
    stats: {
      total: 0,
      pending: 0,
      processing: 0,
      completed: 0
    },
    orders: [],
    filteredOrders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.loadOrders()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 页面卸载时清除定时器
    if (this.durationTimer) {
      clearInterval(this.durationTimer)
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.loadOrders()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '工单管理',
      path: '/pages/admin/orders/index'
    }
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  // 搜索确认
  onSearch() {
    this.filterOrders()
  },

  // 切换状态
  switchStatus(e) {
    const status = e.currentTarget.dataset.status
    this.setData({ status }, () => {
      this.filterOrders()
    })
  },

  // 筛选工单
  filterOrders() {
    const { orders, status, keyword } = this.data
    let filtered = [...orders]

    // 状态筛选
    if (status !== 'all') {
      filtered = filtered.filter(order => order.status === status)
    }

    // 关键词搜索
    if (keyword) {
      const key = keyword.toLowerCase()
      filtered = filtered.filter(order => 
        order.orderNo.toLowerCase().includes(key) ||
        order.customer.toLowerCase().includes(key)
      )
    }

    this.setData({ filteredOrders: filtered })
  },

  // 查看详情
  viewDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/admin/orders/detail/index?id=${id}`
    })
  },

  // 分配工程师
  assignEngineer(e) {
    const { id } = e.currentTarget.dataset
    const order = this.data.orders.find(o => o.id === id)
    
    wx.navigateTo({
      url: `/pages/admin/orders/assign/index?id=${id}&customer=${order.customer}&equipment=${order.equipment}`
    })
  },

  // 催单
  urgeOrder(e) {
    const { id } = e.currentTarget.dataset
    const order = this.data.orders.find(o => o.id === id)
    
    wx.showModal({
      title: '确认催单',
      content: `是否确认催促工程师 ${order.engineer} 加快处理？`,
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '处理中' })
          // TODO: 调用催单接口
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '已催单',
              icon: 'success'
            })
          }, 1000)
        }
      }
    })
  },

  // 计算维修时长
  calculateDuration(startTime) {
    const start = new Date(startTime).getTime()
    const now = new Date().getTime()
    const hours = Math.floor((now - start) / (1000 * 60 * 60))
    
    if (hours < 24) {
      return {
        duration: hours,
        durationText: `${hours}小时`
      }
    } else {
      const days = Math.floor(hours / 24)
      const remainHours = hours % 24
      return {
        duration: hours,
        durationText: `${days}天${remainHours}小时`
      }
    }
  },

  // 加载工单列表
  loadOrders() {
    // 模拟数据
    const orders = [
      {
        id: '001',
        orderNo: 'WO20231127001',
        status: 'pending',
        statusText: '待处理',
        customer: '余卫才',
        equipment: '660F 0300',
        issue: '打不着火',
        createTime: '2023-11-27 10:30',
        engineer: ''
      },
      {
        id: '002',
        orderNo: 'WO20231127002',
        status: 'processing',
        statusText: '处理中',
        customer: '张三机械厂',
        equipment: '1100F',
        issue: '液压系统异常',
        createTime: '2023-11-27 09:15',
        engineer: '张星',
        startTime: '2023-11-27 09:30'
      },
      {
        id: '003',
        orderNo: 'WO20231127003',
        status: 'processing',
        statusText: '处理中',
        customer: '王五建设',
        equipment: '330F',
        issue: '制动系统异响',
        createTime: '2023-11-26 14:00',
        engineer: '古松',
        startTime: '2023-11-26 14:30'
      },
      {
        id: '004',
        orderNo: 'WO20231127004',
        status: 'completed',
        statusText: '已完成',
        customer: '李四工程',
        equipment: '220F',
        issue: '启动困难',
        createTime: '2023-11-27 08:45',
        engineer: '古松',
        startTime: '2023-11-27 09:00',
        endTime: '2023-11-27 11:30'
      }
    ]

    // 计算进行中工单的维修时长
    orders.forEach(order => {
      if (order.status === 'processing' && order.startTime) {
        const { duration, durationText } = this.calculateDuration(order.startTime)
        order.duration = duration
        order.durationText = durationText
      }
    })

    // 计算统计数据
    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      completed: orders.filter(o => o.status === 'completed').length
    }

    this.setData({ 
      orders,
      filteredOrders: orders,
      stats
    })

    // 如果有进行中的工单，启动定时器更新时长
    if (orders.some(o => o.status === 'processing')) {
      this.startDurationTimer()
    }
  },

  // 启动时长更新定时器
  startDurationTimer() {
    // 清除旧定时器
    if (this.durationTimer) {
      clearInterval(this.durationTimer)
    }

    // 每分钟更新一次时长
    this.durationTimer = setInterval(() => {
      const { orders } = this.data
      let needUpdate = false

      orders.forEach(order => {
        if (order.status === 'processing' && order.startTime) {
          const { duration, durationText } = this.calculateDuration(order.startTime)
          if (order.duration !== duration) {
            order.duration = duration
            order.durationText = durationText
            needUpdate = true
          }
        }
      })

      if (needUpdate) {
        this.setData({ orders, filteredOrders: this.filterOrders(orders) })
      }
    }, 60000) // 每分钟更新一次
  }
})