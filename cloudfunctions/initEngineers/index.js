// 初始化工程师数据的云函数
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'my-app-dev-4gmyfe9h6ae04648'  // 添加你的云环境ID
})
const db = cloud.database()

// 初始工程师数据
const initialEngineers = [
  {
    name: "张星",
    phone: "13929620127",
    level: "中级技师",
    type: "挖机",
    status: "在职",
    createTime: db.serverDate(),
    updateTime: db.serverDate()
  },
  {
    name: "古松",
    phone: "13535359565",
    level: "中级技师",
    type: "装机",
    status: "在职",
    createTime: db.serverDate(),
    updateTime: db.serverDate()
  },
  {
    name: "游咏锐",
    phone: "18350642423",
    level: "初级技师",
    type: "电工",
    status: "在职",
    createTime: db.serverDate(),
    updateTime: db.serverDate()
  },
  {
    name: "叶世湾",
    phone: "17819275852",
    level: "初级技师",
    type: "挖机",
    status: "在职",
    createTime: db.serverDate(),
    updateTime: db.serverDate()
  },
  {
    name: "邓少敏",
    phone: "13707998648",
    level: "初级技师",
    type: "装机综合",
    status: "在职",
    createTime: db.serverDate(),
    updateTime: db.serverDate()
  },
  {
    name: "杨豪",
    phone: "15591608769",
    level: "初级技师",
    type: "装机",
    status: "在职",
    createTime: db.serverDate(),
    updateTime: db.serverDate()
  },
  {
    name: "林泽权",
    phone: "15323665078",
    level: "初级技师",
    type: "挖机",
    status: "在职",
    createTime: db.serverDate(),
    updateTime: db.serverDate()
  },
  {
    name: "刘星",
    phone: "15679678528",
    level: "实习技师",
    type: "装挖",
    status: "在职",
    createTime: db.serverDate(),
    updateTime: db.serverDate()
  },
  {
    name: "李波",
    phone: "19083196293",
    level: "初级技师",
    type: "装机",
    status: "在职",
    createTime: db.serverDate(),
    updateTime: db.serverDate()
  },
  {
    name: "赖德福",
    phone: "18979933091",
    level: "初级技师",
    type: "综合",
    status: "在职",
    createTime: db.serverDate(),
    updateTime: db.serverDate()
  }
];

/**
 * 初始化工程师数据
 * 注意：此函数只应在首次设置时调用
 */
exports.main = async (event, context) => {
  console.log('开始初始化工程师数据');
  
  try {
    // 先删除所有记录
    const collection = db.collection('engineers');
    const oldData = await collection.get();
    
    // 如果有旧数据，逐个删除
    if (oldData.data.length > 0) {
      for (const item of oldData.data) {
        await collection.doc(item._id).remove();
      }
      console.log(`已删除 ${oldData.data.length} 条旧数据`);
    }

    // 添加新数据
    for (const engineer of initialEngineers) {
      await collection.add({
        data: engineer
      });
      console.log(`已添加工程师：${engineer.name}`);
    }
    
    console.log('工程师数据初始化完成');
    return {
      success: true,
      message: '工程师数据初始化成功'
    };
    
  } catch (error) {
    console.error('工程师数据初始化失败');
    console.error('错误详情：', error);
    return {
      success: false,
      error: error.message
    };
  }
};