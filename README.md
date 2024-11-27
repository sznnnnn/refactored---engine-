# 工程设备报修小程序

## 项目简介
这是一个用于工程设备报修的微信小程序，用户可以通过填写表单提交设备故障报修申请。同时提供服务人员入口，方便维修人员查看和处理报修信息。

## 版本控制
当前版本：v0.1.2
上次更新：2024-03-20

### 版本历史
- v0.1.2 (2024-03-20)
  - 优化图片上传（支持8张照片）
  - 添加位置功能（支持自动定位和手动选点）
  - 完善文档说明
  - 优化表单验证逻辑
  - 改进用户界面交互体验
- v0.1.1 (2024-03-15)
  - 修复图片上传bug
  - 优化位置选择功能
  - 添加电话号码格式验证
- v0.1.0 (2024-03-10)
  - 初始化项目
  - 完成基础联系信息模块
  - 完成设备故障信息模块
  - 添加服务人员登录功能
  - 添加位置信息功能
  - 添加图片上传功能

### 提交记录
- 2024-03-20: feat: 优化图片上传和位置功能
- 2024-03-15: fix: 修复已知问题并优化体验
- 2024-03-10: feat: 完成工程设备报修首页功能

## 功能特点
1. 基础联系信息填写
   - 姓名输入（自动聚焦，50字限制）
   - 电话号码输入（支持手机号和固话格式验证）

2. 设备故障信息
   - 设备类型选择（支持多种工程设备）
   - 故障类型选择（根据设备类型动态显示对应故障选项）
   - 故障详情描述（最多500字）
   - 故障现场照片上传（最多8张）

3. 位置信息
   - 自动获取当前位置
   - 支持手动选择位置
   - 显示详细地址信息

4. 服务人员功能
   - 服务人员登录（姓名和手机号验证）
   - 查看报修列表（开发中）

## 已实现功能
- [x] 基础联系信息输入和验证
- [x] 设备类型和故障类型联动选择
- [x] 故障详情描述（支持多行文本）
- [x] 故障现场照片上传（最多8张，支持预览和删除）
- [x] 位置信息获取（支持自动定位和手动选点）
- [x] 服务人员登录入口

## 待开发功能
- [ ] 后端接口对接
- [ ] 服务人员工单管理
- [ ] 报修状态跟踪
- [ ] 维修进度反馈

## 开发环境
- 微信开发者工具 Stable 1.06.2403200
- Node.js 18.0.0+
- 小程序基础库 2.32.1

## 项目结构

## 颜色规范

### 主要颜色
- 品牌色：`#1989fa`（蓝色）
- 背景色：`#ffffff`（白色）
- 分割线：`#f5f5f5`（浅灰）

### 文字颜色
- 主要文字：`#333333`（深灰）
- 次要文字：`#666666`（灰色）
- 提示文字：`#999999`（浅灰）
- 警示文字：`#ff4d4f`（红色）

### 状态颜色
- 成功状态：`#1989fa`（蓝色）
- 警告状态：`#ff9800`（橙色）
- 错误状态：`#ff4d4f`（红色）

## 组件样式

### 卡片
```css
{
  background: #ffffff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}
```

### 按钮
```css
{
  background: #1989fa;  /* 主要按钮 */
  color: #ffffff;
  border-radius: 8rpx;
}
```

### 文本样式
- 大标题：32rpx, 500字重
- 正文：28rpx, 常规字重
- 次要文本：26rpx, 常规字重
- 提示文本：24rpx, 常规字重

## 布局规范

### 间距
- 页面内边距：30rpx
- 卡片内边距：20rpx
- 元素间距：20rpx
- 文本间距：10rpx

### 圆角
- 卡片圆角：12rpx
- 按钮圆角：8rpx
- 小元素圆角：4rpx

## 工程师端页面

### 工单列表页
- 显示所有待处理和进行中的工单
- 按时间倒序排列
- 显示工单状态、类型和时间

### 工作台页
- 显示工作统计数据
- 提供快捷功能入口
- 显示今日工作安排

### 个人中心页
- 显示工程师基本信息
- 提供设置和退出功能
- 显示工作统计数据

## 注意事项
1. 所有颜色值使用变量管理，便于统一修改
2. 文字大小使用rpx单位，适配不同屏幕
3. 状态颜色要符合直觉，便于用户理解
4. 布局要保持一致性，提升用户体验