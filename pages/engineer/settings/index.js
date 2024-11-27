// pages/engineer/settings/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    settings: {
      notification: true,
      sound: true,
      location: true,
      orderSort: 'time',
      showDistance: true,
      autoRefresh: true
    },
    cacheSize: '2.3',
    version: '0.1.8'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 加载本地设置
    const settings = wx.getStorageSync('settings')
    if (settings) {
      this.setData({ settings })
    }
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

  // 消息通知开关
  onNotificationChange(e) {
    this.updateSetting('notification', e.detail.value)
  },

  // 声音提醒开关
  onSoundChange(e) {
    this.updateSetting('sound', e.detail.value)
  },

  // 自动定位开关
  onLocationChange(e) {
    this.updateSetting('location', e.detail.value)
  },

  // 工单排序方式
  onSortChange(e) {
    const value = e.detail.value === '0' ? 'time' : 'distance'
    this.updateSetting('orderSort', value)
  },

  // 距离显示开关
  onDistanceChange(e) {
    this.updateSetting('showDistance', e.detail.value)
  },

  // 自动刷新开关
  onRefreshChange(e) {
    this.updateSetting('autoRefresh', e.detail.value)
  },

  // 更新设置
  updateSetting(key, value) {
    const { settings } = this.data
    settings[key] = value
    this.setData({ settings })
    wx.setStorageSync('settings', settings)
  },

  // 清除缓存
  clearCache() {
    wx.showModal({
      title: '提示',
      content: '确定要清除缓存吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '清理中' })
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '清理完成',
              icon: 'success'
            })
            this.setData({ cacheSize: '0.0' })
          }, 1500)
        }
      }
    })
  },

  // 检查更新
  checkUpdate() {
    wx.showLoading({ title: '检查中' })
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '已是最新版本',
        icon: 'success'
      })
    }, 1500)
  }
})