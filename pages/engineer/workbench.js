Page({
  data: {
    keyword: '',
    currentStatus: 'pending',
    orders: [
      {
        id: '001',
        orderNo: 'WO20231127001',
        status: 'pending',
        statusText: '待处理',
        customer: '余卫才',
        equipment: '660F 0300',
        issue: '打不着火',
        location: '广东省梅州市大埔县青溪镇高陂坑',
        createTime: '2023-11-27 10:00',
        engineers: ['张星', '林泽权'],
        priority: 'high'
      },
      {
        id: '002',
        orderNo: 'WO20231127002',
        status: 'processing',
        statusText: '进行中',
        customer: '老板',
        equipment: '1100',
        issue: '挨销套',
        location: '广东省揭阳市惠来县惠城镇',
        createTime: '2023-11-27 09:30',
        engineers: ['赖得褔', '李波'],
        priority: 'normal'
      },
      {
        id: '003',
        orderNo: 'WO20231127003',
        status: 'suspended',
        statusText: '挂单中',
        customer: '张三',
        equipment: '220F',
        issue: '设备异响',
        location: '广东省广州市',
        createTime: '2023-11-27 08:00',
        engineers: ['王五'],
        priority: 'low'
      }
    ],
    filteredOrders: []
  },

  onLoad() {
    this.filterOrders();
  },

  // 处理状态切换
  onSwitchStatus(e) {
    const { status } = e.detail;
    this.setData({
      currentStatus: status
    }, () => {
      this.filterOrders();
    });
  },

  // 筛选订单
  filterOrders() {
    const { keyword, orders, currentStatus } = this.data;
    let filtered = orders;

    // 状态筛选
    filtered = filtered.filter(order => order.status === currentStatus);

    // 关键词搜索
    if (keyword) {
      filtered = filtered.filter(order => 
        order.orderNo.toLowerCase().includes(keyword) ||
        order.customer.toLowerCase().includes(keyword) ||
        order.equipment.toLowerCase().includes(keyword) ||
        order.location.toLowerCase().includes(keyword)
      );
    }

    this.setData({ filteredOrders: filtered });
  },

  // 搜索输入处理
  onSearchInput(e) {
    const keyword = e.detail.value.toLowerCase();
    this.setData({ keyword }, () => {
      this.filterOrders();
    });
  },

  // 点击订单
  onOrderTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/engineer/order-detail/index?id=${id}`
    })
  },

  // 长按订单显示操作菜单
  onOrderLongTap(e) {
    const id = e.currentTarget.dataset.id
    const order = this.data.orders.find(o => o.id === id)
    
    wx.showActionSheet({
      itemList: ['分配工程师', '修改优先级', '添加备注', '拨打电话'],
      success: (res) => {
        switch(res.tapIndex) {
          case 0:
            this.assignEngineer(order)
            break
          case 1:
            this.changePriority(order)
            break
          case 2:
            this.addRemark(order)
            break
          case 3:
            this.makePhoneCall(order)
            break
        }
      }
    })
  }
}) 