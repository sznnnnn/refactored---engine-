Component({
  data: {
    active: 0,
    list: [
      {
        icon: '📋',
        text: '订单',
        url: '/pages/order/index'
      },
      {
        icon: '🔧',
        text: '工作台',
        url: '/pages/workbench/index'
      },
      {
        icon: '👤',
        text: '我的',
        url: '/pages/profile/index'
      }
    ]
  },
  methods: {
    onChange(event) {
      const index = event.detail;
      const url = this.data.list[index].url;
      wx.switchTab({ url });
    }
  }
}); 