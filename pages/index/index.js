Page({
  data: {
    // 表单基础数据
    formData: {
      name: '',        // 用户姓名
      phone: '',       // 联系电话
      deviceType: '',  // 选中的设备类型
      faultType: '',    // 选中的故障类型
      faultDetail: '',  // 故障详情
      images: []        // 故障照片
    },
    phoneError: false,         // 电话号码格式是否错误
    deviceTypeIndex: -1,       // 设备类型选择的索引，-1表示未选择
    faultTypeIndex: -1,        // 故障类型选择的索引，-1表示未选择
    faultPlaceholder: '请描述：\n1. 故障发生的具体情况\n2. 是首次发生还是多次出现\n3. 设备出现问题时正在进行什么作业',

    // 设备类型列表
    deviceTypes: ['挖掘机', '装载机', '起重机', '混凝土搅拌机'],

    // 故障类型映射表：不同设备对应不同的故障类型
    faultTypesMap: {
      '挖掘机': ['发动机故障', '液压系统故障', '底盘故障'],
      '装载机': ['传动系统故障', '制动系统故障', '铲斗故障'],
      '起重机': ['起升机构故障', '变幅机构故障', '回转机构故障'],
      '混凝土搅拌机': ['搅拌系统故障', '传动系统故障', '电气系统故障']
    },
    currentFaultTypes: [],  // 当前设备可选的故障类型列表

    // 服务人员登录相关数据
    showStaffLogin: false,    // 是否显示登录弹窗
    staffPhoneError: false,   // 手机号格式是否错误
    canStaffLogin: false,     // 是否可以登录
    staffForm: {
      name: '',              // 服务人员姓名
      phone: ''             // 服务人员手机号
    },
    canSubmit: false,  // 是否可以提交

    // 添加位置相关数据
    location: {
      latitude: 0,
      longitude: 0
    },
    markers: [],
    address: ''
  },

  onLoad() {
    // 页面加载时获取位置
    this.getLocation()
  },

  // 获取位置信息
  getLocation() {
    wx.showLoading({
      title: '定位中...'
    })

    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        const { latitude, longitude } = res
        this.setData({
          location: { latitude, longitude },
          markers: [{
            id: 1,
            latitude,
            longitude,
            width: 32,
            height: 32
          }]
        })
        this.getAddress(latitude, longitude)
      },
      fail: (err) => {
        console.error('获取位置失败：', err)
        wx.showToast({
          title: '获取位置失败，请检查定位权限',
          icon: 'none'
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  // 根据经纬度获取地址
  getAddress(latitude, longitude) {
    // 使用腾讯地图或其他地图服务的逆地址解析
    wx.request({
      url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=YOUR_KEY`,
      success: (res) => {
        if (res.data.status === 0) {
          const address = res.data.result.formatted_addresses?.recommend || res.data.result.address
          this.setData({ address })
        }
      }
    })
  },

  // 重新获取位置
  refreshLocation() {
    this.getLocation()
  },

  // 验证手机号格式
  validatePhone(phone) {
    const phoneReg = /^1[3-9]\d{9}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{6,7}(-\d{1,4})?$/
    return phoneReg.test(phone)
  },

  // 处理姓名输入
  onNameInput(e) {
    this.setData({
      'formData.name': e.detail.value
    })
    this.checkSubmit()
  },

  // 处理电话输入
  onPhoneInput(e) {
    const phone = e.detail.value
    const phoneError = !this.validatePhone(phone)
    this.setData({ 
      'formData.phone': phone,
      phoneError 
    })
    this.checkSubmit()
  },

  // 处理设备类型选择
  onDeviceTypeChange(e) {
    const index = parseInt(e.detail.value)
    const deviceType = this.data.deviceTypes[index]
    
    this.setData({
      deviceTypeIndex: index,
      'formData.deviceType': deviceType,
      // 重置故障类型
      faultTypeIndex: -1,
      'formData.faultType': '',
      // 更新可选的故障类型列表
      currentFaultTypes: this.data.faultTypesMap[deviceType]
    })
    this.checkSubmit()
  },

  // 处理故障类型选择
  onFaultTypeChange(e) {
    const index = parseInt(e.detail.value)
    this.setData({
      faultTypeIndex: index,
      'formData.faultType': this.data.currentFaultTypes[index]
    })
    this.checkSubmit()
  },

  // 处理故障详情输入
  onDetailInput(e) {
    this.setData({
      'formData.faultDetail': e.detail.value
    })
    this.checkSubmit()
  },

  // 上传图片
  uploadImages() {
    const { images } = this.data.formData
    if (images.length >= 8) {
      wx.showToast({ 
        title: '最多上传8张图片', 
        icon: 'none' 
      })
      return
    }

    wx.chooseImage({
      count: 8 - images.length,
      sizeType: ['compressed'],  // 使用压缩图片
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = [...images, ...res.tempFilePaths]
        const finalImages = newImages.slice(0, 8)
        
        this.setData({
          'formData.images': finalImages
        })
      }
    })
  },

  // 预览图
  previewImage(e) {
    const index = e.currentTarget.dataset.index
    wx.previewImage({
      urls: this.data.formData.images,
      current: this.data.formData.images[index]
    })
  },

  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index
    const images = this.data.formData.images
    images.splice(index, 1)
    this.setData({
      'formData.images': images
    })
  },

  // 显示服务人员登录弹窗
  showStaffLogin() {
    this.setData({ showStaffLogin: true })
  },

  // 隐藏服务人员登录弹窗
  hideStaffLogin() {
    this.setData({ 
      showStaffLogin: false,
      staffForm: { name: '', phone: '' },
      staffPhoneError: false
    })
  },

  // 处理服务人员姓名输入
  onStaffNameInput() {
    this.checkStaffLogin()
  },

  // 处理服务人员手机号输入
  onStaffPhoneInput(e) {
    const phone = e.detail.value
    const staffPhoneError = !this.validatePhone(phone)
    this.setData({ staffPhoneError })
    this.checkStaffLogin()
  },

  // 检查是否可以登录
  checkStaffLogin() {
    const { name, phone } = this.data.staffForm
    const canStaffLogin = name && phone && !this.data.staffPhoneError
    this.setData({ canStaffLogin })
  },

  // 服务人员登录
  staffLogin() {
    if (!this.data.canStaffLogin) {
      return
    }
    
    // 这里可以添加实际的登录验证逻辑
    wx.showToast({
      title: '登录成功',
      icon: 'success',
      success: () => {
        setTimeout(() => {
          // 登录成功后跳转到服务人员页面
          wx.navigateTo({
            url: '/pages/staff/staff'
          })
        }, 1500)
      }
    })
  },

  // 检查是否可以提交
  checkSubmit() {
    const { name, phone, deviceType, faultType, faultDetail } = this.data.formData
    const { latitude, longitude } = this.data.location
    
    const canSubmit = name && 
      phone && 
      !this.data.phoneError && 
      deviceType && 
      faultType && 
      faultDetail &&
      latitude && 
      longitude  // 添加位置验证
    
    this.setData({ canSubmit })
  },

  // 提交表单
  submitForm() {
    if (!this.data.canSubmit) {
      wx.showToast({
        title: '请完善必填信息',
        icon: 'none'
      })
      return
    }

    // 显示提交确认
    wx.showModal({
      title: '确认提交',
      content: '确定要提交报修申请吗？',
      success: (res) => {
        if (res.confirm) {
          this.doSubmit()
        }
      }
    })
  },

  // 执行提交
  doSubmit() {
    wx.showLoading({
      title: '提交中...'
    })

    // 这里模拟提交过程，实际项目中需要调用后端API
    setTimeout(() => {
      wx.hideLoading()
      
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          // 延迟重置表单，让用户看到成功提示
          setTimeout(() => {
            this.resetForm()
          }, 2000)
        }
      })
    }, 1500)
  },

  // 重置表单
  resetForm() {
    this.setData({
      formData: {
        name: '',
        phone: '',
        deviceType: '',
        faultType: '',
        faultDetail: '',
        images: []
      },
      phoneError: false,
      deviceTypeIndex: -1,
      faultTypeIndex: -1,
      canSubmit: false
    })
  },

  // 添加选择位置方法
  chooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        const { latitude, longitude, address, name } = res
        this.setData({
          location: { latitude, longitude },
          address: name ? `${name}(${address})` : address,
          markers: [{
            id: 1,
            latitude,
            longitude,
            width: 32,
            height: 32
          }]
        })
        this.checkSubmit()
      },
      fail: (err) => {
        if (err.errMsg.indexOf('auth deny') !== -1) {
          wx.showToast({
            title: '请授权位置权限',
            icon: 'none'
          })
        }
      }
    })
  }
}) 