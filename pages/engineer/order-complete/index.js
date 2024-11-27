Page({
  data: {
    record: {
      customer: '',
      equipment: '',
      issue: '',
      model: '',
      serialNo: '',
      deviceTime: '',
      engineers: [],
      vehicle: '',
      serviceItem: '',
      faultResolution: '',
      solution: '',
      remainingIssues: '',
      completeTime: '',
      paymentMethod: '',
      location: '',
      photos: [],
      photoTime: '',
      photoLocation: ''
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
    canvas: null,
    canvasContext: null,
    canvasWidth: 0,
    canvasHeight: 0
  },

  onLoad(options) {
    this.initDateTimePicker()
    this.initCanvas()
    this.loadRecordData(options)
  },

  // 初始化日期时间选择器
  initDateTimePicker() {
    const date = new Date()
    const years = []
    const months = []
    const days = []
    const hours = []
    const minutes = []
    
    // 年份，从当前年份开始，共2年
    for (let i = date.getFullYear(); i <= date.getFullYear() + 1; i++) {
      years.push(i + '年')
    }
    
    // 月份，1-12月
    for (let i = 1; i <= 12; i++) {
      months.push(i + '月')
    }
    
    // 日期，1-31日
    for (let i = 1; i <= 31; i++) {
      days.push(i + '日')
    }
    
    // 小时，0-23时
    for (let i = 0; i < 24; i++) {
      hours.push(i + '时')
    }
    
    // 分钟，0-59分
    for (let i = 0; i < 60; i++) {
      minutes.push(i + '分')
    }

    // 设置当前时间
    const currentYear = date.getFullYear()
    const currentMonth = date.getMonth()
    const currentDay = date.getDate()
    const currentHour = date.getHours()
    const currentMinute = date.getMinutes()

    this.setData({
      dateTimeArray: [years, months, days, hours, minutes],
      dateTimeIndex: [0, currentMonth, currentDay - 1, currentHour, currentMinute]
    })
  },

  // 日期时间选择器变化事件
  onDateTimeChange(e) {
    const { value } = e.detail
    const { dateTimeArray } = this.data
    
    // 组合时间字符串
    const dateTime = dateTimeArray.map((arr, index) => {
      const val = arr[value[index]]
      return val.slice(0, -1) // 移除单位（年月日时分）
    }).join('-')

    this.setData({
      dateTimeIndex: value,
      'record.completeTime': dateTime
    })
  },

  // 初始化画布
  initCanvas() {
    const query = wx.createSelectorQuery()
    query.select('#watermarkCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (res[0] && res[0].node) {
          const canvas = res[0].node
          const ctx = canvas.getContext('2d')
          
          wx.getSystemInfo({
            success: (sysInfo) => {
              // 设置画布大小
              canvas.width = sysInfo.windowWidth
              canvas.height = sysInfo.windowWidth
              
              this.setData({
                canvasWidth: sysInfo.windowWidth,
                canvasHeight: sysInfo.windowWidth,
                canvas: canvas,
                canvasContext: ctx
              })
            }
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
        record: {
          ...this.data.record,
          ...recordData,
          engineers: recordData.engineers || [],
          photos: recordData.photos || []
        }
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

  // 拍照打卡
  takePhoto() {
    // 先获取位置信息
    wx.showLoading({ title: '获取位置中' })
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        const location = `${res.latitude}, ${res.longitude}`
        this.setData({ 'record.photoLocation': location })
        this.startCamera()
      },
      fail: (error) => {
        console.error('位置获取失败:', error)
        wx.showToast({
          title: '位置获取失败',
          icon: 'none'
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  // 启动相机
  startCamera() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'], // 只允许拍照
      success: (res) => {
        wx.showLoading({
          title: '处理中',
          mask: true
        })

        // 记录拍照时间
        const now = new Date()
        const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
        
        this.setData({ 'record.photoTime': timeStr })

        // 添加水印
        this.addWatermark(res.tempFilePaths[0])
          .then(watermarkedPath => {
            this.setData({
              'record.photos': [watermarkedPath]
            })
          })
          .catch(error => {
            console.error('照片处理失败:', error)
            wx.showToast({
              title: '照片处理失败',
              icon: 'none'
            })
          })
          .finally(() => {
            wx.hideLoading()
          })
      }
    })
  },

  // 预览照片
  previewPhoto() {
    const { photos } = this.data.record
    if (photos.length) {
      wx.previewImage({
        urls: photos
      })
    }
  },

  // 添加水印到照片
  addWatermark(tempFilePath) {
    return new Promise((resolve, reject) => {
      const { canvas, canvasContext: ctx, canvasWidth, canvasHeight } = this.data
      if (!canvas || !ctx) {
        reject(new Error('Canvas not initialized'))
        return
      }

      const img = canvas.createImage()
      img.onload = () => {
        // 清空画布
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        
        // 绘制图片
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight)
        
        // 绘制水印背景
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect(0, canvasHeight - 80, canvasWidth, 80)
        
        // 绘制文字
        ctx.fillStyle = '#ffffff'
        ctx.font = '14px sans-serif'
        
        // 绘制时间
        ctx.fillText(this.data.record.photoTime, 10, canvasHeight - 50)
        
        // 绘制位置
        ctx.fillText(this.data.record.photoLocation, 10, canvasHeight - 20)

        // 导出图片
        wx.canvasToTempFilePath({
          canvas,
          success: res => resolve(res.tempFilePath),
          fail: reject
        })
      }

      img.onerror = () => reject(new Error('Image load failed'))
      img.src = tempFilePath
    })
  }
}) 