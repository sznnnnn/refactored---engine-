Page({
  data: {
    record: {
      customer: '',
      model: '',
      serialNo: '',
      deviceTime: '',
      engineers: [],
      vehicle: '',
      serviceItem: '',
      faultResolution: '',
      completeTime: '',
      remainingIssues: '',
      paymentMethod: '',
      location: '',
      photos: []
    },
    dateTimeArray: [],
    dateTimeIndex: [0, 0, 0, 0, 0],
    paymentMethods: [
      '现结',
      '微信支付',
      '公司对接',
      '转账',
      '月结',
      '三包',
      '保内',
      '整机赠送',
      '未付款',
      '已收款',
      '待确认',
      '无'
    ],
    paymentIndex: -1,
    canvasWidth: 0,
    canvasHeight: 0
  },

  onLoad(options) {
    this.initDateTimePicker()
    this.initCanvas()
    this.loadRecordData(options)
  },

  // 初始化画布
  initCanvas() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          canvasWidth: res.windowWidth,
          canvasHeight: res.windowWidth
        })
      }
    })
  },

  // 加载记录数据
  loadRecordData(options) {
    if (!options?.record) {
      this.showErrorAndGoBack('参数错误')
      return
    }

    try {
      const recordData = JSON.parse(decodeURIComponent(options.record))
      this.setData({
        record: { ...this.data.record, ...recordData }
      })
    } catch (error) {
      console.error('数据解析错误:', error)
      this.showErrorAndGoBack('数据解析错误')
    }
  },

  // 显示错误并返回
  showErrorAndGoBack(message) {
    wx.showToast({
      title: message,
      icon: 'error'
    })
    setTimeout(() => wx.navigateBack(), 1500)
  },

  // 输入处理统一方法
  handleInput(e, field) {
    this.setData({
      [`record.${field}`]: e.detail.value
    })
  },

  // 各输入框的处理方法
  onCustomerInput: e => this.handleInput(e, 'customer'),
  onModelInput: e => this.handleInput(e, 'model'),
  onSerialNoInput: e => this.handleInput(e, 'serialNo'),
  onDeviceTimeInput: e => this.handleInput(e, 'deviceTime'),
  onServiceItemInput: e => this.handleInput(e, 'serviceItem'),
  onFaultResolutionInput: e => this.handleInput(e, 'faultResolution'),
  onRemainingIssuesInput: e => this.handleInput(e, 'remainingIssues'),

  // 照片处理
  choosePhoto() {
    const { photos = [] } = this.data.record
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
      success: this.processPhotos.bind(this)
    })
  },

  // 处理照片
  processPhotos(res) {
    wx.showLoading({
      title: '处理中',
      mask: true
    })

    const { photos = [] } = this.data.record
    const processPhoto = async (index = 0, newPhotos = []) => {
      if (index >= res.tempFilePaths.length) {
        this.setData({
          'record.photos': [...photos, ...newPhotos]
        })
        wx.hideLoading()
        return
      }

      try {
        const watermarkedPath = await this.addWatermark(res.tempFilePaths[index])
        newPhotos.push(watermarkedPath)
        processPhoto(index + 1, newPhotos)
      } catch (error) {
        console.error('照片处理失败:', error)
        wx.showToast({
          title: '照片处理失败',
          icon: 'none'
        })
        wx.hideLoading()
      }
    }

    processPhoto()
  },

  // 其他方法保持不变...
}) 