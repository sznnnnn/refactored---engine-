// pages/admin/orders/index.js
const app = getApp()
const orderService = require('../../../services/order')

Page({
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
    filteredOrders: [],
    loading: false,
    currentPage: 1,
    pageSize: 10,
    hasMore: true
  },

  onLoad() {
    this.loadOrders()
    this.loadStats()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  // 导入工单数据
  async importWorkOrders() {
    try {
      wx.showLoading({ title: '导入中...' })
      
      // 调用云函数
      const result = await wx.cloud.callFunction({
        name: 'importWorkOrders'
      })
      
      if (result.result.success) {
        wx.showToast({
          title: '导入成功',
          icon: 'success'
        })
        // 重新加载工单列表
        this.loadOrders()
      } else {
        wx.showToast({
          title: '导入失败',
          icon: 'error'
        })
      }
    } catch (error) {
      console.error('导入失败:', error)
      wx.showToast({
        title: '导入失败',
        icon: 'error'
      })
    } finally {
      wx.hideLoading()
    }
  },

  // 工单状态文本转换
  getStatusText(status) {
    const statusMap = {
      pending: '待处理',
      processing: '处理中',
      completed: '已完成'
    }
    return statusMap[status] || status
  },

  // 日期格式化
  formatDate(dateStr) {
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}`
  },

  // 加载工单统计
  async loadStats() {
    try {
      const stats = await orderService.getOrderStats()
      this.setData({ stats })
    } catch (error) {
      console.error('加载统计失败:', error)
    }
  },

  // 加载工单列表
  async loadOrders(page = 1) {
    if (this.data.loading || (!this.data.hasMore && page > 1)) return

    try {
      this.setData({ loading: true })
      const result = await orderService.getOrders(page, this.data.pageSize)
      
      // 处理返回的数据
      const formattedOrders = result.data.map(order => ({
        ...order,
        statusText: this.getStatusText(order.status),
        createTime: this.formatDate(order.createTime)
      }))
      
      this.setData({ 
        orders: page === 1 ? formattedOrders : [...this.data.orders, ...formattedOrders],
        filteredOrders: page === 1 ? formattedOrders : [...this.data.filteredOrders, ...formattedOrders],
        currentPage: page,
        hasMore: formattedOrders.length === this.data.pageSize,
        loading: false
      })
    } catch (error) {
      console.error('加载工单失败:', error)
      wx.showToast({
        title: '加载失败',
        icon: 'error'
      })
      this.setData({ loading: false })
    }
  },

  // 下拉刷新
  async onPullDownRefresh() {
    await this.loadOrders(1)
    await this.loadStats()
    wx.stopPullDownRefresh()
  },

  // 上拉加载更多
  onReachBottom() {
    if (this.data.hasMore) {
      this.loadOrders(this.data.currentPage + 1)
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

  // 创建工单
  async createOrder(data) {
    try {
      wx.showLoading({ title: '提交中...' })
      const result = await orderService.createOrder(data)
      
      wx.showToast({
        title: '创建成功',
        icon: 'success'
      })
      
      // 刷新列表
      this.loadOrders(1)
      return result
    } catch (error) {
      console.error('创建工单失败:', error)
      wx.showToast({
        title: '创建失败',
        icon: 'error'
      })
    } finally {
      wx.hideLoading()
    }
  }
})