Page({
  data: {
    orders: [],
    searchKey: '',
    currentStatus: '',
    currentDateRange: '',
    startDate: '',
    endDate: '',
    page: 1,
    pageSize: 10,
    hasMore: true,
    loading: false
  },

  onLoad() {
    this.loadOrders()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  async loadOrders(isLoadMore = false) {
    if (this.data.loading) return
    
    try {
      this.setData({ loading: true })
      
      const db = wx.cloud.database()
      const _ = db.command
      let query = db.collection('orders')
      
      // 构建查询条件
      const conditions = {}
      
      // 搜索关键词
      if (this.data.searchKey) {
        conditions._or = [
          { orderNo: db.RegExp({ regexp: this.data.searchKey, options: 'i' }) },
          { customer: db.RegExp({ regexp: this.data.searchKey, options: 'i' }) }
        ]
      }
      
      // 状态筛选
      if (this.data.currentStatus) {
        conditions.status = this.data.currentStatus
      }
      
      // 日期筛选
      if (this.data.startDate && this.data.endDate) {
        conditions.createTime = _.gte(new Date(this.data.startDate)).and(_.lte(new Date(this.data.endDate)))
      }
      
      // 应用查询条件
      if (Object.keys(conditions).length > 0) {
        query = query.where(conditions)
      }
      
      // 获取总数
      const countResult = await query.count()
      const total = countResult.total
      
      // 分页查询
      const res = await query
        .orderBy('createTime', 'desc')
        .skip((this.data.page - 1) * this.data.pageSize)
        .limit(this.data.pageSize)
        .get()

      const orders = res.data.map(order => ({
        id: order._id,
        orderNo: order.orderNo || '',
        status: order.status || '待处理',
        statusText: this.getStatusText(order.status),
        customer: order.customer || '',
        equipment: order.equipment || '',
        issue: order.issue || '',
        engineerName: order.engineerName || '',
        createTime: this.formatTime(order.createTime)
      }))

      this.setData({
        orders: isLoadMore ? [...this.data.orders, ...orders] : orders,
        hasMore: orders.length === this.data.pageSize && 
                (this.data.page * this.data.pageSize) < total
      })
    } catch (err) {
      console.error('加载工单失败:', err)
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    } finally {
      this.setData({ loading: false })
    }
  },

  // 获取状态文本
  getStatusText(status) {
    const statusMap = {
      'pending': '待处理',
      'processing': '处理中',
      'completed': '已完成',
      'cancelled': '已取消',
      '待处理': '待处理',
      '处理中': '处理中',
      '已完成': '已完成',
      '已取消': '已取消'
    }
    return statusMap[status] || status
  },

  // 格式化时间
  formatTime(time) {
    if (!time) return ''
    
    let date
    if (typeof time === 'string') {
      time = time.replace(' ', 'T')
      if (!time.includes('T')) {
        time = time.replace(/(\d{4}-\d{2}-\d{2})/, '$1T00:00:00')
      }
    }
    
    try {
      date = new Date(time)
      if (isNaN(date.getTime())) {
        return ''
      }
      
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      
      return `${year}-${month}-${day} ${hours}:${minutes}`
    } catch (error) {
      console.error('Format time error:', error)
      return ''
    }
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({
      searchKey: e.detail.value,
      page: 1
    }, () => {
      this.loadOrders()
    })
  },

  // 显示状态筛选
  showStatusFilter() {
    this.setData({ showStatusFilter: true })
  },

  // 显示日期筛选
  showDatePicker() {
    this.setData({ showDatePicker: true })
  },

  // 选择状态
  selectStatus(e) {
    const status = e.currentTarget.dataset.status
    this.setData({
      currentStatus: status,
      showStatusFilter: false,
      page: 1
    }, () => {
      this.loadOrders()
    })
  },

  // 选择日期范围
  selectDateRange(e) {
    const range = e.currentTarget.dataset.range
    let startDate = ''
    let endDate = ''
    const today = new Date()
    
    switch(range) {
      case 'today':
        startDate = this.formatDate(today)
        endDate = startDate
        break
      case 'week':
        const weekStart = new Date(today)
        weekStart.setDate(today.getDate() - today.getDay())
        startDate = this.formatDate(weekStart)
        endDate = this.formatDate(today)
        break
      case 'month':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
        startDate = this.formatDate(monthStart)
        endDate = this.formatDate(today)
        break
    }

    this.setData({
      startDate,
      endDate,
      currentDateRange: range,
      showDatePicker: false,
      page: 1
    }, () => {
      this.loadOrders()
    })
  },

  // 查看详情
  viewDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/admin/order-detail/index?id=${id}`
    })
  },

  // 分配工程师
  assignEngineer(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/admin/assign-engineer/index?id=${id}`
    })
  },

  // 查看进度
  viewProgress(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/admin/order-progress/index?id=${id}`
    })
  },

  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  },

  // 下拉刷新
  async onPullDownRefresh() {
    this.setData({
      page: 1,
      hasMore: true
    }, async () => {
      await this.loadOrders()
      wx.stopPullDownRefresh()
    })
  },

  // 上拉加载更多
  async onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.setData({
        page: this.data.page + 1
      }, () => {
        this.loadOrders(true)
      })
    }
  }
})