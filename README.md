# 后端云函数文档

本文档详细说明了所有云函数的功能、参数和返回值。

## 设备管理相关云函数

### 1. getEquipments - 获取设备列表
- **功能**：获取所有设备的列表信息
- **入参**：无
- **返回值**：
  ```javascript
  [
    {
      _id: "设备ID",
      name: "设备名称",
      type: "设备类型",
      // ... 其他设备信息
    }
  ]
  ```
- **使用示例**：
  ```javascript
  const result = await wx.cloud.callFunction({
    name: 'getEquipments'
  });
  ```

### 2. addEquipment - 添加新设备
- **功能**：添加一个新的设备到数据库
- **入参**：
  ```javascript
  {
    name: "设备名称",
    type: "设备类型",
    // ... 其他设备信息
  }
  ```
- **返回值**：
  ```javascript
  {
    _id: "新创建的设备ID"
  }
  ```
- **使用示例**：
  ```javascript
  const result = await wx.cloud.callFunction({
    name: 'addEquipment',
    data: {
      name: "测试设备",
      type: "装载机"
    }
  });
  ```

### 3. updateEquipment - 更新设备信息
- **功能**：更新指定设备的信息
- **入参**：
  ```javascript
  {
    id: "设备ID",
    // 要更新的字段
    name: "新的设备名称",
    type: "新的设备类型"
  }
  ```
- **返回值**：
  ```javascript
  {
    updated: true,
    stats: { updated: 1 }
  }
  ```
- **使用示例**：
  ```javascript
  const result = await wx.cloud.callFunction({
    name: 'updateEquipment',
    data: {
      id: "设备ID",
      name: "新名称"
    }
  });
  ```

### 4. deleteEquipment - 删除设备
- **功能**：从数据库中删除指定的设备
- **入参**：
  ```javascript
  {
    id: "要删除的设备ID"
  }
  ```
- **返回值**：
  ```javascript
  {
    deleted: true,
    stats: { removed: 1 }
  }
  ```
- **使用示例**：
  ```javascript
  const result = await wx.cloud.callFunction({
    name: 'deleteEquipment',
    data: {
      id: "设备ID"
    }
  });
  ```

## 数据库集合结构

### equipments 集合 

### engineers 集合
```javascript
{
  _id: "设备ID",          // 系统自动生成
  name: "工程师姓名",     // 字符串
  phone: "手机号",       // 字符串，用于验证身份
  level: "技师等级",     // 字符串：初级技师/中级技师/实习技师
  type: "专业类型",      // 字符串：挖机/装机/电工/综合/装挖
  status: "状态",        // 字符串：在职
  createTime: Date,      // 创建时间
  updateTime: Date       // 最后更新时间
}
```

### 已添加的工程师数据
- 张星 (13929620127) - 挖机中级技师
- 古松 (13535359565) - 装机中级技师
- 游咏锐 (18350642423) - 电工初级技师
- 叶世湾 (17819275852) - 挖机初级技师
- 邓少敏 (13707998648) - 装机综合初级技师
- 杨豪 (15591608769) - 装机初级技师
- 林泽权 (15323665078) - 挖机初级技师
- 刘星 (15679678528) - 装挖实习技师
- 李波 (19083196293) - 装机初级技师
- 赖德福 (18979933091) - 综合初级技师

## 云函数说明

### verifyEngineer
- 功能：验证工程师身份
- 输入：`{ phone: "手机号" }`
- 输出：
  ```javascript
  {
    verified: true/false,    // 是否验证通过
    engineer: {              // 如果验证通过，返回工程师信息
      name: "工程师姓名",
      level: "技师等级",
      type: "专业类型"
    }
  }
  ```

### initEngineers
- 功能：初始化工程师数据
- 输入：无需参数
- 输出：
  ```javascript
  {
    success: true/false,
    message: "初始化结果信息"
  }
  ```
- 注意：此函数会清空并重新添加所有工程师数据，谨慎使用

## 注意事项
1. 所有云函数都有完整的错误日志记录
2. 工程师手机号用于身份验证，需要严格保密
3. 数据库操作都有访问限制，确保数据安全
4. 工程师信息的修改需要管理员权限