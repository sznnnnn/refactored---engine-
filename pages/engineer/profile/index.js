Page({
  data: {
    engineer: null,
    // 工程师等级定义
    levels: {
      'L1': '初级工程师',
      'L2': '中级工程师',
      'L3': '高级工程师',
      'L4': '专家工程师',
      'L5': '首席工程师'
    },
    stats: {
      todayCount: 0,
      weekCount: 0,
      monthCount: 0,
      totalCount: 0
    },
    serviceAccount: 'Seea_Xin_' // 客服微信号
  },

  onShow() {
    this.loadEngineerInfo()
    this.loadWorkStats()
  },

  // 加载工程师信息
  loadEngineerInfo() {
    const engineer = wx.getStorageSync('engineer')
    if (!engineer) {
      wx.redirectTo({
        url: '/pages/login/login'
      })
      return
    }

    // 根据工单数量计算等级
    const { totalCount } = this.data.stats
    let level = 'L1'
    let levelName = '初级工程师'

    if (totalCount >= 500) {
      level = 'L5'
      levelName = '首席工程师'
    } else if (totalCount >= 300) {
      level = 'L4'
      levelName = '专家工程师'
    } else if (totalCount >= 150) {
      level = 'L3'
      levelName = '高级工程师'
    } else if (totalCount >= 50) {
      level = 'L2'
      levelName = '中级工程师'
    }

    this.setData({
      engineer: {
        ...engineer,
        level,
        levelName
      }
    })
  },

  // 加载工作统计
  loadWorkStats() {
    // 模拟加载统计数据
    this.setData({
      stats: {
        todayCount: 3,
        weekCount: 12,
        monthCount: 45,
        totalCount: 128
      }
    })
  },

  // 页面跳转
  goToHistory() {
    wx.navigateTo({
      url: '/pages/engineer/history/index'
    })
  },

  goToSettings() {
    wx.navigateTo({
      url: '/pages/engineer/settings/index'
    })
  },

  // 显示反馈建议弹窗
  showFeedback() {
    wx.showModal({
      title: '反馈建议',
      editable: true,
      placeholderText: '请输入您的建议或反馈...',
      success: (res) => {
        if (res.confirm && res.content) {
          // 提交反馈
          wx.showLoading({
            title: '提交中'
          })

          // 构建反馈消息
          const { engineer } = this.data
          const feedback = {
            content: res.content,
            engineer: engineer?.name || '未知工程师',
            phone: engineer?.phone || '未知号码',
            time: new Date().toLocaleString('zh-CN')
          }

          // 复制客服微信号
          wx.setClipboardData({
            data: this.data.serviceAccount,
            success: () => {
              wx.hideLoading()
              
              // 显示提交成功并引导添加客服
              wx.showModal({
                title: '反馈已提交',
                content: `客服微信号已复制(${this.data.serviceAccount})，请添加客服微信以便及时处理您的反馈。`,
                confirmText: '去添加',
                success: (res) => {
                  if (res.confirm) {
                    // 打开微信
                    wx.openCustomerServiceChat({
                      extInfo: { url: this.data.serviceAccount },
                      corpId: '', // 企业ID，如果有的话
                      success: () => {
                        wx.showToast({
                          title: '感谢您的反馈',
                          icon: 'success'
                        })
                      },
                      fail: () => {
                        wx.showToast({
                          title: '请手动添加客服微信',
                          icon: 'none'
                        })
                      }
                    })
                  }
                }
              })
            },
            fail: () => {
              wx.hideLoading()
              wx.showToast({
                title: '反馈提交失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },

  // 退出登录
  handleLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除登录信息
          wx.removeStorageSync('engineer')
          
          // 返回登录页
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      }
    })
  },

  // 跳转到数据分析
  goToAnalysis() {
    wx.navigateTo({
      url: '/pages/engineer/analysis/index'
    })
  }
}) 