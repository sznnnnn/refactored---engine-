Page({
  data: {
    keyword: '',
    orders: [
      {
        id: '001',
        orderNo: 'WO20231120001',
        status: 'completed',
        statusText: '已完成',
        customer: '余卫才',
        equipment: '660F 0300',
        issue: '打不着火',
        location: '广东省梅州市大埔县青溪镇高陂坑',
        createTime: '2023-11-20 10:00',
        completeTime: '2023-11-20 11:30',
        solution: '更换火花塞，清理油路',
        engineer: '张星'
      },
      {
        id: '002',
        orderNo: 'WO20231118002',
        status: 'completed',
        statusText: '已完成',
        customer: '李四工程',
        equipment: '220F',
        issue: '液压油泄漏',
        location: '广东省梅州市兴宁市工业园区',
        createTime: '2023-11-18 14:20',
        completeTime: '2023-11-18 16:45',
        solution: '更换密封圈，补充液压油',
        engineer: '张星'
      },
      {
        id: '003',
        orderNo: 'WO20231115003',
        status: 'completed',
        statusText: '已完成',
        customer: '张三机械厂',
        equipment: '1100F',
        issue: '发动机过热',
        location: '广东省梅州市梅江区机械大道88号',
        createTime: '2023-11-15 09:00',
        completeTime: '2023-11-15 10:30',
        solution: '清理散热器，更换冷却液',
        engineer: '张星'
      }
    ]
  },

  onLoad(options) {
    if (options.keyword) {
      this.setData({
        keyword: decodeURIComponent(options.keyword)
      }, () => {
        this.searchOrders()
      })
    } else {
      this.loadHistoryOrders()
    }
  },

  searchOrders() {
    const { keyword, orders } = this.data
    const filtered = orders.filter(order => 
      order.orderNo.toLowerCase().includes(keyword.toLowerCase()) ||
      order.customer.includes(keyword) ||
      order.equipment.toLowerCase().includes(keyword.toLowerCase()) ||
      order.location.includes(keyword)
    )
    this.setData({ filteredOrders: filtered })
  },

  loadHistoryOrders() {
    wx.showLoading({
      title: '加载中'
    })
    
    // 模拟加载延迟
    setTimeout(() => {
      this.setData({
        filteredOrders: this.data.orders
      })
      wx.hideLoading()
    }, 500)
  },

  onOrderTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/engineer/order-detail/index?id=${id}`
    })
  }
}) 