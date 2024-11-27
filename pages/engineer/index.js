// pages/engineer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 'pending',
    orders: [
      {
        id: '001',
        orderNo: 'WO20231127001',
        status: 'pending',
        statusText: '未处理',
        customer: '余卫才',
        equipment: '660F 0300',
        issue: '打不着火',
        location: '广东省梅州市大埔县青溪镇高陂坑'
      },
      {
        id: '002',
        orderNo: 'WO20231127002',
        status: 'processing',
        statusText: '进行中',
        customer: '老板',
        equipment: '1100',
        issue: '挨销套',
        location: '广东省揭阳市惠来县惠城镇'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取登录时保存的工程师信息
    const engineer = wx.getStorageSync('engineer');
    if (!engineer) {
      wx.redirectTo({
        url: '/pages/login/login'
      });
      return;
    }

    this.setData({ engineer });
    this.filterOrders();
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

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
    const { status, orders } = this.data
    const filteredOrders = orders.filter(order => order.status === status)
    this.setData({ filteredOrders })
  },

  // 加载工单列表
  loadOrders() {
    // TODO: 从服务器获取工单列表
    // 这里先用模拟数据
    this.setData({
      orders: []
    });
  },

  // 点击工单
  onOrderClick(e) {
    const orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/engineer/order-detail/index?id=${orderId}`
    });
  }
})