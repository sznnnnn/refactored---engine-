Page({
  data: {
    order: {
      id: '',
      orderNo: '',
      status: '',
      statusText: '',
      customer: '',
      equipment: '',
      issue: '',
      location: '',
      customerPhotos: []
    },
    repairInfo: {
      model: '',
      serialNo: '',
      deviceTime: '',
      engineers: [],
      vehicle: '',
      serviceItem: '',
      faultDesc: '',
      faultResolution: '',
      solution: '',
      remainingIssues: '',
      photos: []
    },
    showEngineerModal: false,
    newEngineer: '',
    vehicles: [
      '粤DYP068检修车',
      '粤D1865Q皮卡',
      '粤DAW339',
      '粤DB529D',
      '粤DA533H',
      '粤D9856C',
      '粤DXA399',
      '粤D3859A货车',
      '粤D1892H'
    ],
    vehicleIndex: -1
  },

  onLoad(options) {
    if (!options || !options.id) {
      wx.showToast({
        title: '工单信息错误',
        icon: 'error'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
      return
    }

    // 获取工单信息
    this.loadOrderDetail(options.id)

    // 获取当前工程师信息
    const engineer = wx.getStorageSync('engineer')
    if (engineer) {
      this.setData({
        'repairInfo.engineers': [engineer.name]
      })
    }
  },

  // 加载工单详情
  loadOrderDetail(id) {
    wx.showLoading({
      title: '加载中'
    })

    // 模拟获取工单详情
    setTimeout(() => {
      // 模拟数据
      const order = {
        id: id,
        orderNo: 'WO20231127001',
        status: 'processing',
        statusText: '进行中',
        customer: '余卫才',
        equipment: '660F 0300',
        issue: '打不着火',
        location: '广东省梅州市大埔县青溪镇高陂坑',
        customerPhotos: []
      }

      this.setData({ order }, () => {
        wx.hideLoading()
      })
    }, 500)
  },

  // 故障描述输入
  onFaultDescInput(e) {
    this.setData({
      'repairInfo.faultDesc': e.detail.value
    })
  },

  // 维修方案输入
  onSolutionInput(e) {
    this.setData({
      'repairInfo.solution': e.detail.value
    })
  },

  // 选择照片
  choosePhoto() {
    const { photos } = this.data.repairInfo
    if (photos.length >= 8) {
      return wx.showToast({
        title: '最多上传8张照片',
        icon: 'none'
      })
    }

    wx.chooseImage({
      count: 8 - photos.length,
      sizeType: ['compressed'],
      sourceType: ['camera', 'album'],
      success: (res) => {
        this.setData({
          'repairInfo.photos': [...photos, ...res.tempFilePaths]
        })
      }
    })
  },

  // 移除照片
  removePhoto(e) {
    const { index } = e.currentTarget.dataset
    const { photos } = this.data.repairInfo
    photos.splice(index, 1)
    this.setData({
      'repairInfo.photos': photos
    })
  },

  // 预览照片
  previewPhoto(e) {
    const { index } = e.currentTarget.dataset
    const { photos } = this.data.repairInfo
    wx.previewImage({
      current: photos[index],
      urls: photos
    })
  },

  // 提交维修记录
  submitRepair() {
    const { repairInfo } = this.data
    if (!repairInfo.faultDesc) {
      return wx.showToast({
        title: '请填写故障描述',
        icon: 'none'
      })
    }
    if (!repairInfo.solution) {
      return wx.showToast({
        title: '请填写维修方案',
        icon: 'none'
      })
    }

    wx.showLoading({
      title: '提交中'
    })

    // 模拟提交
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      })
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }, 800)
  },

  // 复制地址
  copyLocation() {
    const { location } = this.data.order
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

  // 保存维修记录
  saveRepair() {
    wx.showLoading({
      title: '保存中'
    })

    // 模拟保存
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      })

      // 延迟返回
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/engineer/index'
        })
      }, 1500)
    }, 800)
  },

  // 完工提交
  completeOrder() {
    const { repairInfo } = this.data
    if (!repairInfo.model && !repairInfo.serialNo && 
        !repairInfo.deviceTime && !repairInfo.engineers && 
        !repairInfo.vehicle && !repairInfo.serviceItem && 
        !repairInfo.faultDesc && !repairInfo.faultResolution && 
        !repairInfo.solution && !repairInfo.remainingIssues && 
        !repairInfo.photos.length) {
      return wx.showToast({
        title: '请至少填写一项维修记录',
        icon: 'none'
      })
    }

    // 添加延迟
    wx.showLoading({
      title: '加载中'
    })

    try {
      const recordStr = encodeURIComponent(JSON.stringify(repairInfo))
      setTimeout(() => {
        wx.hideLoading()
        wx.navigateTo({
          url: `/pages/engineer/order-complete/index?record=${recordStr}`,
          fail: (error) => {
            console.error('导航失败：', error)
            wx.showToast({
              title: '页面跳转失败',
              icon: 'none'
            })
          }
        })
      }, 500)
    } catch (error) {
      wx.hideLoading()
      wx.showToast({
        title: '数据处理失败',
        icon: 'none'
      })
    }
  },

  // 返回前确认
  onUnload() {
    const { repairInfo } = this.data
    if (repairInfo.faultDesc || repairInfo.solution || repairInfo.photos.length) {
      wx.showModal({
        title: '提示',
        content: '是否保存当前维修记录？',
        success: (res) => {
          if (res.confirm) {
            this.saveRepair()
          }
        }
      })
    }
  },

  // 预览客户上传的照片
  previewCustomerPhoto(e) {
    const { index } = e.currentTarget.dataset
    const { customerPhotos } = this.data.order
    wx.previewImage({
      current: customerPhotos[index],
      urls: customerPhotos
    })
  },

  // 输入处理方法
  onModelInput(e) {
    this.setData({ 'repairInfo.model': e.detail.value })
  },

  onSerialNoInput(e) {
    this.setData({ 'repairInfo.serialNo': e.detail.value })
  },

  onDeviceTimeInput(e) {
    this.setData({ 'repairInfo.deviceTime': e.detail.value })
  },

  onEngineersInput(e) {
    this.setData({ 'repairInfo.engineers': e.detail.value })
  },

  onVehicleInput(e) {
    this.setData({ 'repairInfo.vehicle': e.detail.value })
  },

  onServiceItemInput(e) {
    this.setData({ 'repairInfo.serviceItem': e.detail.value })
  },

  onFaultResolutionInput(e) {
    this.setData({ 'repairInfo.faultResolution': e.detail.value })
  },

  onRemainingIssuesInput(e) {
    this.setData({ 'repairInfo.remainingIssues': e.detail.value })
  },

  // 显示添加工程师弹窗
  showEngineerInput() {
    this.setData({ 
      showEngineerModal: true,
      newEngineer: ''
    })
  },

  // 隐藏添加工程师弹窗
  hideEngineerInput() {
    this.setData({ 
      showEngineerModal: false,
      newEngineer: ''
    })
  },

  // 新工程师输入
  onNewEngineerInput(e) {
    this.setData({
      newEngineer: e.detail.value
    })
  },

  // 添加工程师
  addEngineer() {
    const { newEngineer, repairInfo } = this.data
    if (!newEngineer.trim()) {
      return wx.showToast({
        title: '请输入工程师姓名',
        icon: 'none'
      })
    }

    // 检查是否已存在
    if (repairInfo.engineers.includes(newEngineer)) {
      return wx.showToast({
        title: '该工程师已添加',
        icon: 'none'
      })
    }

    this.setData({
      'repairInfo.engineers': [...repairInfo.engineers, newEngineer],
      showEngineerModal: false,
      newEngineer: ''
    })
  },

  // 移除工程师（不能移除第一个，即当前工程师）
  removeEngineer(e) {
    const { index } = e.currentTarget.dataset
    const { engineers } = this.data.repairInfo
    engineers.splice(index, 1)
    this.setData({
      'repairInfo.engineers': engineers
    })
  },

  // 车辆选择
  onVehicleChange(e) {
    const index = e.detail.value
    this.setData({
      vehicleIndex: index,
      'repairInfo.vehicle': this.data.vehicles[index]
    })
  }
}) 