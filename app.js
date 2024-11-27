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
  },

  // 全局数据
  globalData: {
    // 用于存储全局共享的数据
    userInfo: null,
    repairList: [],
    staffInfo: null
  }
}) 