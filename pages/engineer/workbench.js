Page({
  data: {
    stats: {
      pending: 0,
      inProgress: 0,
      completed: 0
    },
    todayOrders: []
  },

  onLoad() {
    this.loadStats();
    this.loadTodayWork();
  },

  // 加载统计数据
  loadStats() {
    // TODO: 从服务器获取统计数据
    this.setData({
      stats: {
        pending: 2,
        inProgress: 1,
        completed: 5
      }
    });
  },

  // 加载今日工作
  loadTodayWork() {
    // TODO: 从服务器获取今日工作
    this.setData({
      todayOrders: [
        {
          id: 1,
          time: '09:30',
          deviceType: '挖掘机维修',
          status: '待处理'
        },
        {
          id: 2,
          time: '14:00',
          deviceType: '装载机检修',
          status: '已安排'
        }
      ]
    });
  },

  // 扫码维修
  onScanCode() {
    wx.scanCode({
      success: (res) => {
        console.log('扫码结果：', res);
        // TODO: 处理扫码结果
      }
    });
  },

  // 工作打卡
  onCheckIn() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log('当前位置：', res);
        // TODO: 提交打卡信息
        wx.showToast({
          title: '打卡成功',
          icon: 'success'
        });
      }
    });
  },

  // 点击工单
  onOrderClick(e) {
    const orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/order/detail?id=${orderId}`
    });
  }
}); 