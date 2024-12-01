// pages/admin/engineers/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    engineers: [
      {
        id: '001',
        name: '张星',
        level: 'L2',
        levelName: '挖机中级技师',
        skills: '液压系统，发动机板块',
        status: 'active',
        statusText: '在线',
        phone: '13929620127',
        orderCount: 128,
        score: 4.8
      },
      {
        id: '002',
        name: '古松',
        level: 'L2',
        levelName: '装机中级技师',
        skills: '装载机整车维修',
        status: 'active',
        statusText: '在线',
        phone: '13535359565',
        orderCount: 108,
        score: 4.7
      },
      {
        id: '003',
        name: '游咏锐',
        level: 'L1',
        levelName: '电工初级技师',
        skills: '装挖整车电路系统，空调系统',
        status: 'active',
        statusText: '在线',
        phone: '18350642423',
        orderCount: 86,
        score: 4.6
      },
      {
        id: '004',
        name: '叶世湾',
        level: 'L1',
        levelName: '挖机初级技师',
        skills: '挖机液压系统，底盘件系统',
        status: 'active',
        statusText: '在线',
        phone: '17819275852',
        orderCount: 75,
        score: 4.5
      },
      {
        id: '005',
        name: '邓少敏',
        level: 'L1',
        levelName: '装机综合初级技师',
        skills: '装载机整车维修，发动机系统',
        status: 'active',
        statusText: '在线',
        phone: '13707998648',
        orderCount: 92,
        score: 4.6
      },
      {
        id: '006',
        name: '杨豪',
        level: 'L1',
        levelName: '装机初级技师',
        skills: '装挖初级保养检修，空调系统',
        status: 'offline',
        statusText: '离线',
        phone: '15591608769',
        orderCount: 68,
        score: 4.4
      },
      {
        id: '007',
        name: '林泽权',
        level: 'L1',
        levelName: '挖机初级技师',
        skills: '装挖初级保养检修，破碎锤板块',
        status: 'active',
        statusText: '在线',
        phone: '15323665078',
        orderCount: 72,
        score: 4.5
      },
      {
        id: '008',
        name: '刘星',
        level: 'L0',
        levelName: '装挖实习技师',
        skills: '装挖初级保养检修',
        status: 'active',
        statusText: '在线',
        phone: '15679678528',
        orderCount: 45,
        score: 4.3
      },
      {
        id: '009',
        name: '李波',
        level: 'L1',
        levelName: '装机初级技师',
        skills: '装挖初级保养检修，镗孔一体，液压清洗过滤',
        status: 'offline',
        statusText: '离线',
        phone: '19083196293',
        orderCount: 82,
        score: 4.5
      },
      {
        id: '010',
        name: '赖德福',
        level: 'L1',
        levelName: '综合性初级技师',
        skills: '综合性技术支持，全方位顾问',
        status: 'active',
        statusText: '在线',
        phone: '18979933091',
        orderCount: 95,
        score: 4.7
      }
    ],
    rankType: 'orders', // 默认按工单数排序
    sortedEngineers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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

  // 搜索输入
  onSearchInput(e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  // 搜索确认
  onSearch() {
    const { keyword } = this.data
    // TODO: 实现搜索功能
  },

  // 添加工程师
  addEngineer() {
    wx.navigateTo({
      url: '/pages/admin/engineers/add/index'
    })
  },

  // 编辑工程师
  editEngineer(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/admin/engineers/edit/index?id=${id}`
    })
  },

  // 查看工单
  viewOrders(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/admin/engineers/orders/index?id=${id}`
    })
  },

  // 切换状态
  toggleStatus(e) {
    const { id } = e.currentTarget.dataset
    const engineer = this.data.engineers.find(item => item.id === id)
    
    wx.showModal({
      title: '提示',
      content: `确定要${engineer.status === 'disabled' ? '启用' : '停用'}该工程师吗？`,
      success: (res) => {
        if (res.confirm) {
          // TODO: 调用接口修改状态
          wx.showLoading({ title: '处理中' })
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '操作成功',
              icon: 'success'
            })
            this.loadEngineers()
          }, 1000)
        }
      }
    })
  },

  // 切换排名维度
  switchRank(e) {
    const rankType = e.currentTarget.dataset.type
    this.setData({ rankType }, () => {
      this.sortEngineers()
    })
  },

  // 排序工程师列表
  sortEngineers() {
    const { engineers, rankType } = this.data
    let sortedEngineers = [...engineers]

    switch (rankType) {
      case 'orders':
        sortedEngineers.sort((a, b) => b.orderCount - a.orderCount)
        break
      case 'score':
        sortedEngineers.sort((a, b) => b.score - a.score)
        break
      case 'efficiency':
        // 计算每个工程师的日均工单数
        sortedEngineers = sortedEngineers.map(engineer => ({
          ...engineer,
          efficiency: (engineer.orderCount / 30).toFixed(1) // 假设按30天计算
        }))
        sortedEngineers.sort((a, b) => b.efficiency - a.efficiency)
        break
    }

    this.setData({ sortedEngineers })
  },

  // 加载工程师列表
  loadEngineers() {
    // TODO: 从服务器获取数据
    this.sortEngineers()
  }
})