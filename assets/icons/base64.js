// 将这些图标保存为对应的PNG文件
const icons = {
  // 底部导航图标
  list: 'data:image/png;base64,...', // 工单列表图标
  listActive: 'data:image/png;base64,...', // 工单列表选中图标
  workbench: 'data:image/png;base64,...', // 工作台图标
  workbenchActive: 'data:image/png;base64,...', // 工作台选中图标
  profile: 'data:image/png;base64,...', // 我的图标
  profileActive: 'data:image/png;base64,...', // 我的选中图标

  // 工单状态图标
  pending: '📝', // 待处理
  processing: '🔧', // 进行中
  completed: '✅', // 已完成
  suspended: '⏸️', // 挂单中
  rejected: '❌', // 已拒绝

  // 工单类型图标
  repair: '🛠️', // 维修工单
  install: '📦', // 安装工单
  inspect: '🔍', // 检查工单
  maintain: '⚙️', // 保养工单
  emergency: '🚨', // 紧急工单

  // 功能图标
  location: '📍', // 位置
  phone: '📞', // 电话
  camera: '📷', // 拍照
  time: '⏰', // 时间
  copy: '📋', // 复制
  refresh: '🔄', // 刷新
  search: '🔍', // 搜索
  filter: '🔖', // 筛选
  sort: '📊', // 排序
  more: '⋮', // 更多
}

export default icons 