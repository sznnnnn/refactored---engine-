App({
  onLaunch() {
    // 初始化云开发环境
    wx.cloud.init({
      env: 'my-app-dev-4gmyfe9h6ae04648', // 替换为你的云环境ID
      traceUser: true
    })

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