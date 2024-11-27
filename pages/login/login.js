// pages/login/login.js
import { verifyEngineer } from '../../services/engineer';

Page({
  data: {
    name: '张工',
    phone: '13800138000'
  },

  onLoad() {
    // 直接触发登录
    this.handleLogin()
  },

  // 登录处理
  handleLogin() {
    const { name, phone } = this.data

    wx.showLoading({
      title: '登录中'
    })

    // 保存工程师信息到本地
    const engineer = {
      name,
      phone,
      id: Date.now().toString()
    }
    wx.setStorageSync('engineer', engineer)

    wx.hideLoading()

    // 直接跳转到工单列表页
    wx.reLaunch({
      url: '/pages/engineer/index'
    })
  }
})