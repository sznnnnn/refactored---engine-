// pages/engineer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    engineer: null,
    orders: []
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
    this.loadOrders();
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
      url: `/pages/order/detail?id=${orderId}`
    });
  }
})