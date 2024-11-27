// pages/admin/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    admin: {
      name: '林卓川'
    },
    stats: {
      todayOrders: 12,
      pendingOrders: 5,
      activeEngineers: 8
    },
    recentOrders: [
      {
        id: '001',
        orderNo: 'WO20231127001',
        status: 'pending',
        statusText: '待处理',
        customer: '余卫才',
        createTime: '10:30'
      },
      {
        id: '002',
        orderNo: 'WO20231127002',
        status: 'processing',
        statusText: '处理中',
        customer: '张三机械厂',
        createTime: '09:15'
      },
      {
        id: '003',
        orderNo: 'WO20231127003',
        status: 'completed',
        statusText: '已完成',
        customer: '李四工程',
        createTime: '08:45'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadData()
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

  // 加载数据
  loadData() {
    // TODO: 从服务器获取数据
  },

  // 页面导航
  navigateTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({ url })
  },

  // 查看所有工单
  viewAllOrders() {
    wx.navigateTo({
      url: '/pages/admin/orders/index'
    })
  },

  // 显示设置
  showSettings() {
    wx.showActionSheet({
      itemList: ['修改密码', '清除缓存', '退出登录'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.changePassword()
            break
          case 1:
            this.clearCache()
            break
          case 2:
            this.logout()
            break
        }
      }
    })
  },

  // 修改密码
  changePassword() {
    // TODO: 实现修改密码功能
  },

  // 清除缓存
  clearCache() {
    wx.showLoading({ title: '清理中' })
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '清理完成',
        icon: 'success'
      })
    }, 1500)
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync()
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  }
})