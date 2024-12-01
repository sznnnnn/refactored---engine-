// pages/admin/statistics/index.js
const app = getApp()
// const statisticsService = require('../../../services/statistics')

Page({
  data: {
    activeTab: 'orders',
    orderStats: {
      total: 256,
      today: 12,
      week: 86,
      month: 256,
      statusDistribution: [
        { name: '待处理', value: 15, color: '#ff9800' },
        { name: '处理中', value: 25, color: '#1989fa' },
        { name: '已完成', value: 60, color: '#52c41a' }
      ],
      timeDistribution: [
        { time: '00:00-06:00', value: 5 },
        { time: '06:00-12:00', value: 35 },
        { time: '12:00-18:00', value: 42 },
        { time: '18:00-24:00', value: 18 }
      ],
      trend: [
        { date: '03-12', count: 8 },
        { date: '03-13', count: 10 },
        { date: '03-14', count: 12 },
        { date: '03-15', count: 9 },
        { date: '03-16', count: 11 },
        { date: '03-17', count: 7 },
        { date: '03-18', count: 12 }
      ]
    },
    engineerStats: {
      total: 10,
      online: 8,
      busy: 5,
      avgScore: 4.6,
      performance: [
        { name: '张星', orders: 128, score: 4.8 },
        { name: '古松', orders: 108, score: 4.7 },
        { name: '游咏锐', orders: 86, score: 4.6 },
        { name: '叶世湾', orders: 75, score: 4.5 },
        { name: '邓少敏', orders: 92, score: 4.6 }
      ]
    }
  },

  onLoad() {
    this.loadStatistics()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },

  // 切换标签页
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
  },

  // 加载统计数据
  async loadStatistics() {
    try {
      // const stats = await statisticsService.getStatistics()
      // this.setData({
      //   orderStats: stats.orders,
      //   engineerStats: stats.engineers
      // })
    } catch (error) {
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    }
  },

  // 刷新数据
  onPullDownRefresh() {
    this.loadStatistics().then(() => {
      wx.stopPullDownRefresh()
    })
  }
})