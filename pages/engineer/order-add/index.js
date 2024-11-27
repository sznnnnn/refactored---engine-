Page({
  data: {
    form: {
      customer: '',
      phone: '',
      equipment: '',
      issue: '',
      appointTime: '',
      location: ''
    },
    dateTimeArray: [],
    dateTimeIndex: [0, 0, 0, 0, 0]
  },

  onLoad() {
    this.initDateTimePicker()
  },

  // 初始化日期时间选择器
  initDateTimePicker() {
    const date = new Date()
    const years = []
    const months = []
    const days = []
    const hours = []
    const minutes = []
    
    for (let i = date.getFullYear(); i <= date.getFullYear() + 1; i++) {
      years.push(i + '年')
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i + '月')
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i + '日')
    }
    for (let i = 0; i < 24; i++) {
      hours.push(i + '时')
    }
    for (let i = 0; i < 60; i++) {
      minutes.push(i + '分')
    }

    this.setData({
      dateTimeArray: [years, months, days, hours, minutes],
      dateTimeIndex: [0, date.getMonth(), date.getDate() - 1, date.getHours(), date.getMinutes()]
    })
  },

  // 日期时间选择器变化事件
  onDateTimeChange(e) {
    const { value } = e.detail
    const { dateTimeArray } = this.data
    
    const dateTime = dateTimeArray.map((arr, index) => {
      const val = arr[value[index]]
      return val.slice(0, -1)
    }).join('-')

    this.setData({
      dateTimeIndex: value,
      'form.appointTime': dateTime
    })
  },

  // 获取位置
  getLocation() {
    wx.showLoading({ title: '定位中' })
    
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        // 使用腾讯地图逆地址解析
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            location: `${res.latitude},${res.longitude}`,
            key: 'YOUR_KEY',
            get_poi: 0
          },
          success: (result) => {
            if (result.data.status === 0) {
              const address = result.data.result.address
              const formatted_addresses = result.data.result.formatted_addresses
              const locationText = formatted_addresses?.recommend || address || '广东省梅州市梅江区'
              
              this.setData({
                'form.location': locationText
              })
            }
          },
          fail: () => {
            this.setData({
              'form.location': '广东省梅州市梅江区'
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          title: '定位失败，请手动输入',
          icon: 'none'
        })
      }
    })
  },

  // 提交表单
  submitForm(e) {
    const formData = e.detail.value
    const { appointTime } = this.data.form

    // 验证必填字段
    const requiredFields = ['customer', 'phone', 'equipment', 'issue', 'location']
    for (const field of requiredFields) {
      if (!formData[field]) {
        return wx.showToast({
          title: '请填写完整信息',
          icon: 'none'
        })
      }
    }

    if (!appointTime) {
      return wx.showToast({
        title: '请选择预约时间',
        icon: 'none'
      })
    }

    // 验证手机号
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      return wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    }

    wx.showLoading({ title: '提交中' })

    // TODO: 调用添加工单接口
    setTimeout(() => {
      wx.hideLoading()
      
      // 先显示成功提示
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          // 等待提示显示完成后再返回
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
              fail: (err) => {
                console.error('返回失败:', err)
                // 如果返回失败，尝试跳转到工作台
                wx.switchTab({
                  url: '/pages/engineer/workbench/index'
                })
              }
            })
          }, 2000)
        }
      })
    }, 1000)
  }
}) 