Page({
  data: {
    orders: [
      {
        id: '001',
        orderNo: 'WO20231127001',
        customer: '余卫才',
        equipment: '660F 0300',
        issue: '打不着火',
        location: '广东省梅州市大埔县青溪镇高陂坑',
        createTime: '2023-11-27 10:00',
        urgency: 'high',
        distance: '3.2km'
      },
      {
        id: '002',
        orderNo: 'WO20231127002',
        customer: '张三机械厂',
        equipment: '1100F',
        issue: '液压系统异常',
        location: '广东省梅州市梅江区机械大道88号',
        createTime: '2023-11-27 09:30',
        urgency: 'medium',
        distance: '5.1km'
      },
      {
        id: '003',
        orderNo: 'WO20231127003',
        customer: '李四工程',
        equipment: '220F',
        issue: '启动困难，需要检修',
        location: '广东省梅州市兴宁市工业园区',
        createTime: '2023-11-27 08:45',
        urgency: 'normal',
        distance: '8.7km'
      }
    ]
  },

  onLoad() {
    this.loadGrabOrders()
  },

  loadGrabOrders() {
    // 模拟加载数据
    wx.showLoading({
      title: '加载中'
    })
    
    setTimeout(() => {
      wx.hideLoading()
    }, 500)
  },

  onOrderTap(e) {
    const id = e.currentTarget.dataset.id
    const order = this.data.orders.find(o => o.id === id)
    
    wx.showModal({
      title: '抢单确认',
      content: `是否抢接${order.customer}的工单？\n设备：${order.equipment}\n故障：${order.issue}`,
      success: (res) => {
        if (res.confirm) {
          this.grabOrder(id)
        }
      }
    })
  },

  grabOrder(id) {
    wx.showLoading({
      title: '抢单中'
    })

    // 模拟请求
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '抢单成功',
        icon: 'success'
      })
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }, 800)
  }
}) 