// pages/login/login.js
Page({
  data: {
    username: '',
    password: ''
  },

  // 输入用户名
  onUsernameInput(e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 输入密码
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录
  onLogin() {
    const { username, password } = this.data
    if (!username || !password) {
      wx.showToast({
        title: '请输入用户名和密码',
        icon: 'none'
      })
      return
    }

    // TODO: 调用登录接口
    wx.showLoading({
      title: '登录中'
    })

    setTimeout(() => {
      wx.hideLoading()
      wx.switchTab({
        url: '/pages/admin/index/index'
      })
    }, 1500)
  }
})