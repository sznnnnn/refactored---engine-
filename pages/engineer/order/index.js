// pages/engineer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 今日工作安排
    todayOrders: [
      {
        id: '001',
        orderNo: 'WO20231127001',
        status: 'processing',
        statusText: '进行中',
        customer: '余卫才',
        equipment: '660F 0300',
        issue: '打不着火',
        location: '广东省梅州市大埔县青溪镇高陂坑',
        appointTime: '10:30',
        priority: 'high'
      },
      {
        id: '002',
        orderNo: 'WO20231127002',
        status: 'pending',
        statusText: '待处理',
        customer: '张三机械厂',
        equipment: '1100F',
        issue: '液压系统异常',
        location: '广东省梅州市梅江区机械大道88号',
        appointTime: '14:00',
        priority: 'normal'
      }
    ],

    // 待办工单
    pendingOrders: [
      {
        id: '003',
        orderNo: 'WO20231127003',
        status: 'pending',
        statusText: '待处理',
        customer: '李四工程',
        equipment: '220F',
        issue: '启动困难，需要检修',
        location: '广东省梅州市兴宁市工业园区',
        createTime: '2023-11-27 08:45',
        priority: 'low'
      },
      {
        id: '004',
        orderNo: 'WO20231127004',
        status: 'pending',
        statusText: '待处理',
        customer: '王五建设',
        equipment: '330F',
        issue: '制动系统异响',
        location: '广东省梅州市梅县区建设路123号',
        createTime: '2023-11-27 09:15',
        priority: 'medium'
      }
    ],

    activeOrderId: null,
    rejectReasons: [
      '工程师已满负荷',
      '超出服务范围',
      '设备型号不支持',
      '其他原因'
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
    wx.showLoading({
      title: '加载中'
    })
    
    // 模拟加载延迟
    setTimeout(() => {
      wx.hideLoading()
    }, 500)
  },

  // 点击工单
  onOrderTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/engineer/order-detail/index?id=${id}`
    })
  },

  // 开始处理工单
  startOrder(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/engineer/order-process/index?id=${id}`
    })
  },

  // 拨打电话
  makeCall(e) {
    const { phone } = e.currentTarget.dataset
    wx.makePhoneCall({
      phoneNumber: phone || '10086'
    })
  },

  // 复制地址
  copyLocation(e) {
    const { location } = e.currentTarget.dataset
    wx.setClipboardData({
      data: location,
      success: () => {
        wx.showToast({
          title: '地址已复制',
          icon: 'success'
        })
      }
    })
  },

  // 长按拒绝工单
  onRejectOrder(e) {
    const { id } = e.currentTarget.dataset
    
    // 设置激活状态
    this.setData({ activeOrderId: id })

    // 震动反馈
    wx.vibrateShort()

    // 显示拒绝原因选择
    wx.showActionSheet({
      itemList: this.data.rejectReasons,
      success: (res) => {
        const reason = this.data.rejectReasons[res.tapIndex]
        if (res.tapIndex === this.data.rejectReasons.length - 1) {
          // 选择其他原因时，弹出输入框
          this.showReasonInput(id)
        } else {
          // 直接使用选择的原因
          this.showRejectConfirm(id, reason)
        }
      },
      complete: () => {
        // 清除激活状态
        this.setData({ activeOrderId: null })
      }
    })
  },

  // 显示原因输入框
  showReasonInput(id) {
    wx.showModal({
      title: '拒绝原因',
      editable: true,
      placeholderText: '请输入拒绝原因',
      success: (res) => {
        if (res.confirm && res.content) {
          this.showRejectConfirm(id, res.content)
        }
      }
    })
  },

  // 显示拒绝确认
  showRejectConfirm(id, reason) {
    wx.showModal({
      title: '确认拒绝',
      content: `拒绝原因：${reason}\n是否确认拒绝该工单？`,
      success: (res) => {
        if (res.confirm) {
          this.rejectOrder(id, reason)
        }
      }
    })
  },

  // 拒绝工单
  rejectOrder(id, reason) {
    wx.showLoading({ title: '处理中' })
    
    // TODO: 调用拒绝工单接口
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '已拒绝工单',
        icon: 'success'
      })
      
      // 更新工单列表
      this.loadOrders()

      // 可以在这里记录拒绝原因
      console.log('拒绝原因：', reason)
    }, 1000)
  }
})