// pages/login/login.js
import { verifyEngineer } from '../../services/engineer';

Page({
  data: {
    show: true,
    name: '',
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 页面加载时就显示登录弹窗
    this.setData({ show: true });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /**
   * 显示登录弹窗
   */
  showLogin() {
    this.setData({ show: true });
  },

  /**
   * 关闭登录弹窗
   */
  onClose() {
    this.setData({ 
      show: false,
      name: '',
      phone: ''
    });
  },

  /**
   * 处理登录
   */
  async onLogin() {
    console.log('点击登录按钮');
    const { name, phone } = this.data;
    console.log('输入的信息：', { name, phone });

    // 输入验证
    if (!name.trim()) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return;
    }
    
    if (!phone || phone.length !== 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }

    try {
      wx.showLoading({ title: '验证中...' });
      
      // 调用云函数验证
      const { result } = await wx.cloud.callFunction({
        name: 'verifyEngineer',
        data: { phone }
      });
      
      wx.hideLoading();
      console.log('云函数返回结果：', result);

      if (result && result.verified && result.engineer.name === name) {
        console.log('验证成功');
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
        
        // 保存工程师信息
        wx.setStorageSync('engineer', result.engineer);
        
        // 延迟跳转到工单列表页
        setTimeout(() => {
          wx.reLaunch({  // 使用 reLaunch 替换 navigateTo
            url: '/pages/engineer/index'
          });
        }, 1500);
        
      } else {
        console.log('验证失败');
        wx.showToast({
          title: '姓名或手机号错误',
          icon: 'none'
        });
      }
    } catch (error) {
      console.error('登录失败：', error);
      wx.hideLoading();
      wx.showToast({
        title: '系统错误，请重试',
        icon: 'none'
      });
    }
  },

  // 添加测试方法
  async testCloudFunction() {
    console.log('开始测试云函数');
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'verifyEngineer',
        data: {
          phone: '13929620127'
        }
      });
      console.log('云函数测试结果：', result);
      wx.showToast({
        title: '测试成功',
        icon: 'success'
      });
    } catch (error) {
      console.error('云函数测试失败：', error);
      wx.showToast({
        title: '测试失败',
        icon: 'none'
      });
    }
  }
})