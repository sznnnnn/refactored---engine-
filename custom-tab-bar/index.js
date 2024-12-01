Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: "/pages/admin/index/index",
        text: "工作台",
        icon: ""
      },
      {
        pagePath: "/pages/admin/orders/index",
        text: "工单管理",
        icon: "📋"
      },
      {
        pagePath: "/pages/admin/engineers/index",
        text: "工程师",
        icon: "👥"
      },
      {
        pagePath: "/pages/admin/statistics/index",
        text: "统计",
        icon: "📊"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
}) 