Page({
  data: {
    engineerId: '',
    engineer: null
  },

  onLoad(options) {
    const { id } = options
    this.setData({ engineerId: id })
    if (id) {
      this.loadEngineerData(id)
    }
  },

  // 加载工程师数据
  async loadEngineerData(id) {
    try {
      wx.showLoading({ title: '加载中' })
      // TODO: 从服务器获取工程师数据
      const engineer = {
        id,
        name: '张工',
        level: 'L2',
        phone: '13800138000',
        skills: '挖掘机维修',
        status: 'active'
      }
      this.setData({ engineer })
    } catch (error) {
      console.error('加载失败:', error)
      wx.showToast({
        title: '加载失败',
        icon: 'error'
      })
    } finally {
      wx.hideLoading()
    }
  },

  // 切换状态
  toggleStatus() {
    const { engineer } = this.data
    if (!engineer) return

    const newStatus = engineer.status === 'active' ? 'disabled' : 'active'
    const actionText = newStatus === 'disabled' ? '停用' : '启用'

    wx.showModal({
      title: '提示',
      content: `确定要${actionText}该工程师吗？`,
      success: async (res) => {
        if (res.confirm) {
          try {
            wx.showLoading({ title: '处理中' })
            // TODO: 调用接口修改状态
            // await engineerService.updateStatus(engineer.id, newStatus)
            
            this.setData({
              'engineer.status': newStatus
            })

            wx.showToast({
              title: `${actionText}成功`,
              icon: 'success'
            })
          } catch (error) {
            console.error('操作失败:', error)
            wx.showToast({
              title: '操作失败',
              icon: 'error'
            })
          } finally {
            wx.hideLoading()
          }
        }
      }
    })
  },

  // 表单提交
  onSubmit(e) {
    const formData = e.detail.value
    console.log('表单数据:', formData)
    // TODO: 提交表单数据
  }
}) 