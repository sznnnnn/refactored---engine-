Page({
  data: {
    username: '',
    password: '',
    isReady: false
  },

  onLoad() {
    // 延迟移除预加载遮罩
    setTimeout(() => {
      this.setData({ isReady: true })
    }, 300)
  },

  onShow() {
    // 确保页面显示时已加载
    if (!this.data.isReady) {
      this.setData({ isReady: true })
    }
  },

  onInputUsername(e) {
    this.setData({
      username: e.detail.value
    })
  },

  onInputPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },

  handleLogin() {
    const { username, password } = this.data
    if (username === 'admin' && password === '123456') {
      wx.setStorageSync('userInfo', { 
        username,
        role: 'admin'
      })
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })
      wx.redirectTo({  // 管理员用 redirectTo
        url: '/pages/admin/index/index'
      })
    } else if (username === 'engineer' && password === '123456') {
      wx.setStorageSync('userInfo', { 
        username,
        role: 'engineer'
      })
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })
      wx.switchTab({  // 工程师用 switchTab
        url: '/pages/engineer/workbench/index'  // 改为工作台页面
      })
    } else {
      wx.showToast({
        title: '用户名或密码错误',
        icon: 'none'
      })
    }
  }
})