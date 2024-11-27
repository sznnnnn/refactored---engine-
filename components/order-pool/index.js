Component({
  properties: {
    orders: {
      type: Array,
      value: []
    },
    currentStatus: {
      type: String,
      value: 'pending'
    }
  },

  data: {
    poolStatus: {
      pending: { text: '待处理', count: 0 },
      processing: { text: '进行中', count: 0 },
      suspended: { text: '挂单中', count: 0 }
    }
  },

  lifetimes: {
    attached() {
      this.calculateStatusCounts(this.properties.orders);
    }
  },

  methods: {
    calculateStatusCounts(orders) {
      if (!orders) return;
      
      const counts = {
        pending: 0,
        processing: 0,
        suspended: 0
      };

      orders.forEach(order => {
        if (counts.hasOwnProperty(order.status)) {
          counts[order.status]++;
        }
      });

      const poolStatus = { ...this.data.poolStatus };
      Object.keys(counts).forEach(status => {
        poolStatus[status].count = counts[status];
      });

      this.setData({ poolStatus });
    },

    switchStatus(e) {
      const status = e.currentTarget.dataset.status;
      this.triggerEvent('switchstatus', { status });
    }
  }
}); 