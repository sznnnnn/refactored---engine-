// pages/admin/engineers/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    engineers: [],
    currentTab: 'all',
    statusMap: {
      'free': '空闲',
      'working': '工作中',
      'leave': '请假'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.loadEngineers()
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
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

  // 加载工程师列表
  async loadEngineers(status = 'all') {
    wx.showLoading({ title: '加载中' })
    try {
      const db = wx.cloud.database()
      let query = db.collection('engineers')
      
      if (status !== 'all') {
        const statusEn = Object.keys(this.data.statusMap).find(
          key => this.data.statusMap[key] === status
        )
        query = query.where({ status: statusEn })
      }
      
      const res = await query
        .orderBy('createTime', 'desc')
        .limit(20)
        .get()
      
      const engineers = res.data.map(engineer => ({
        ...engineer,
        statusText: this.data.statusMap[engineer.status] || engineer.status,
        skillDesc: `技能方向：${engineer.skills || '暂无'}`
      }))
      
      this.setData({ engineers })
    } catch (error) {
      console.error('加载工程师数据失败:', error)
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    } finally {
      wx.hideLoading()
    }
  },

  // 切换标签
  switchTab(e) {
    const status = e.currentTarget.dataset.status
    this.setData({ currentTab: status })
    this.loadEngineers(status)
  },

  // 添加工程师
  addEngineer() {
    wx.navigateTo({
      url: '/pages/admin/engineers/add/index'
    })
  },

  // 编辑工程师信息
  editEngineer(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/admin/engineers/edit/index?id=${id}`
    })
  },

  // 查看工程师详情
  viewEngineerDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/admin/engineers/detail/index?id=${id}`
    })
  }
})