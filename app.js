App({
  // 小程序启动时执行
  onLaunch() {
    // 获取本地存储的报修记录
    const repairLogs = wx.getStorageSync('repairLogs') || []
    
    // 添加时间戳
    const timestamp = Date.now()
    repairLogs.unshift(timestamp)
    
    // 更新存储
    wx.setStorageSync('repairLogs', repairLogs)

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'my-app-dev-4gmyfe9h6ae04648',  // 使用你的云环境ID
        traceUser: true,
      });
    }
  },

  // 全局数据
  globalData: {
    // 用于存储全局共享的数据
    userInfo: null,
    repairList: [],
    staffInfo: null
  }
}) 