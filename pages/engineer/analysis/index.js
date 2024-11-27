Page({
  data: {
    currentDate: '2024-03',
    overview: {
      totalCount: 0,
      completedCount: 0,
      completionRate: 0
    },
    typeStats: []
  },

  onLoad() {
    this.initData()
  },

  // 初始化数据
  initData() {
    // 设置当前月份
    const now = new Date()
    const currentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    this.setData({ currentDate })

    // 加载数据
    this.loadAnalysisData(currentDate)
  },

  // 日期选择
  onDateChange(e) {
    const date = e.detail.value
    this.setData({ currentDate: date })
    this.loadAnalysisData(date)
  },

  // 加载分析数据
  loadAnalysisData(date) {
    // 模拟数据
    this.setData({
      overview: {
        totalCount: 86,
        completedCount: 79,
        completionRate: 92
      },
      typeStats: [
        {
          type: '发动机故障',
          count: 28,
          percentage: 32
        },
        {
          type: '液压系统',
          count: 23,
          percentage: 27
        },
        {
          type: '电路系统',
          count: 18,
          percentage: 21
        },
        {
          type: '传动系统',
          count: 12,
          percentage: 14
        },
        {
          type: '其他故障',
          count: 5,
          percentage: 6
        }
      ]
    })
  }
}) 