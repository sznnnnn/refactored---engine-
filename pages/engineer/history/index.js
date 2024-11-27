Page({
  data: {
    activeTab: 'all',
    orders: [], // 所有工单
    filteredOrders: [], // 过滤后的工单
    timeoutCount: 0,
    completedCount: 0,
    suspendedCount: 0,
    pendingCount: 0
  },

  onLoad() {
    this.loadOrders()
  },

  // 切换标签
  switchTab(e) {
    const type = e.currentTarget.dataset.type
    this.setData({ activeTab: type })
    this.filterOrders(type)
  },

  // 加载工单数据
  loadOrders() {
    // 模拟数据
    const orders = [
      {
        id: '001',
        orderNo: 'WO20231127001',
        status: 'timeout',
        statusText: '已超时',
        customer: '余卫才',
        equipment: '660F 0300',
        issue: '打不着火',
        createTime: '2023-11-27 10:30'
      },
      {
        id: '002',
        orderNo: 'WO20231127002',
        status: 'completed',
        statusText: '已完成',
        customer: '张三机械厂',
        equipment: '1100F',
        issue: '液压系统异常',
        createTime: '2023-11-27 14:00'
      },
      {
        id: '003',
        orderNo: 'WO20231127003',
        status: 'suspended',
        statusText: '挂单中',
        customer: '李四工程',
        equipment: '220F',
        issue: '启动困难',
        createTime: '2023-11-27 15:30'
      },
      {
        id: '004',
        orderNo: 'WO20231127004',
        status: 'pending',
        statusText: '待处理',
        customer: '王五建设',
        equipment: '330F',
        issue: '制动系统异响',
        createTime: '2023-11-27 16:00'
      }
    ]

    // 计算各状态数量
    const timeoutCount = orders.filter(order => order.status === 'timeout').length
    const completedCount = orders.filter(order => order.status === 'completed').length
    const suspendedCount = orders.filter(order => order.status === 'suspended').length
    const pendingCount = orders.filter(order => order.status === 'pending').length

    this.setData({ 
      orders,
      filteredOrders: orders,
      timeoutCount,
      completedCount,
      suspendedCount,
      pendingCount
    })
  },

  // 过滤工单
  filterOrders(type) {
    const { orders } = this.data
    let filteredOrders = orders

    if (type !== 'all') {
      filteredOrders = orders.filter(order => order.status === type)
    }

    this.setData({ filteredOrders })
  },

  // 查看全部工单
  viewAllOrders() {
    wx.navigateTo({
      url: '/pages/engineer/order-list/index'
    })
  }
}) 