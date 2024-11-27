Page({
  data: {
    grabOrders: [
      {
        id: '001',
        orderNo: 'WO20231127001',
        customer: '李四工程',
        equipment: '220F',
        issue: '启动困难',
        createTime: '2023-11-27 10:30',
        distance: '3.2'
      },
      {
        id: '002',
        orderNo: 'WO20231127002',
        customer: '王五建设',
        equipment: '330F',
        issue: '制动系统异响',
        createTime: '2023-11-27 14:00',
        distance: '5.1'
      }
    ]
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