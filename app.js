App({
  onLaunch() {
    // 检查登录状态
    const engineer = wx.getStorageSync('engineer')
    if (!engineer) {
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
  },

  globalData: {
    // 全局数据
  }
}) 