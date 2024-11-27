// pages/login/login.js
import { verifyEngineer } from '../../services/engineer';

Page({
  data: {
    username: '',
    password: ''
  },

  // 统一的输入处理函数
  onInput(e) {
    const field = e.currentTarget.dataset.field
    this.setData({
      [field]: e.detail.value
    })
  },

  // 登录处理
  handleLogin() {
    const { username, password } = this.data

    if (!username || !password) {
      return wx.showToast({
        title: '请输入账号密码',
        icon: 'none'
      })
    }

    wx.showLoading({
      title: '登录中'
    })

    // 判断是管理员还是工程师
    if (username === 'admin' && password === 'admin') {
      // 管理员登录
      wx.hideLoading()
      wx.switchTab({
        url: '/pages/admin/index/index'
      })
    } else {
      // 工程师登录
      const engineer = {
        name: username,
        phone: '13800138000',
        id: Date.now().toString()
      }
      wx.setStorageSync('engineer', engineer)
      wx.hideLoading()
      wx.switchTab({
        url: '/pages/engineer/order/index'
      })
    }
  }
})