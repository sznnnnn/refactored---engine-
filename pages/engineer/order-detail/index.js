Page({
  data: {
    order: null
  },

  onLoad(options) {
    const { id } = options
    // 这里应该从服务器获取工单详情
    // 暂时使用模拟数据
    this.setData({
      order: {
        id: '001',
        orderNo: 'WO20231127001',
        status: 'pending',
        statusText: '未处理',
        customer: '余卫才',
        equipment: '660F 0300',
        issue: '打不着火',
        location: '广东省梅州市大埔县青溪镇高陂坑'
      }
    })
  }
}) 