// 设备相关的API请求服务文件
// 本文件包含了所有与设备相关的云函数调用
// 每个函数都会记录详细的日志，方便追踪问题

/**
 * 获取设备列表
 * 调用云函数 'getEquipments' 获取所有设备信息
 * @returns {Promise} 返回设备列表数据
 */
export const getEquipmentList = async () => {
  console.log('开始获取设备列表...');
  try {
    // 调用云函数
    const res = await wx.cloud.callFunction({
      name: 'getEquipments'
    });
    console.log('获取设备列表成功，数据：', res.result);
    return res.result;
  } catch (error) {
    // 详细记录错误信息
    console.error('获取设备列表失败');
    console.error('错误详情：', error);
    console.error('错误时间：', new Date().toLocaleString());
    throw error;
  }
};

/**
 * 添加新设备
 * @param {Object} equipmentData - 设备信息对象，包含设备的详细信息
 * @returns {Promise} 返回添加结果
 */
export const addEquipment = async (equipmentData) => {
  console.log('开始添加新设备，设备数据：', equipmentData);
  try {
    const res = await wx.cloud.callFunction({
      name: 'addEquipment',
      data: equipmentData
    });
    console.log('添加设备成功，返回结果：', res.result);
    return res.result;
  } catch (error) {
    console.error('添加设备失败');
    console.error('传入的设备数据：', equipmentData);
    console.error('错误详情：', error);
    console.error('错误时间：', new Date().toLocaleString());
    throw error;
  }
};

/**
 * 更新设备信息
 * @param {string} id - 设备ID
 * @param {Object} updateData - 需要更新的设备信息
 * @returns {Promise} 返回更新结果
 */
export const updateEquipment = async (id, updateData) => {
  console.log('开始更新设备信息，设备ID：', id);
  console.log('更新的数据：', updateData);
  try {
    const res = await wx.cloud.callFunction({
      name: 'updateEquipment',
      data: {
        id,
        ...updateData
      }
    });
    console.log('更新设备成功，返回结果：', res.result);
    return res.result;
  } catch (error) {
    console.error('更新设备信息失败');
    console.error('设备ID：', id);
    console.error('更新数据：', updateData);
    console.error('错误详情：', error);
    console.error('错误时间：', new Date().toLocaleString());
    throw error;
  }
};

/**
 * 删除设备
 * @param {string} id - 要删除的设备ID
 * @returns {Promise} 返回删除结果
 */
export const deleteEquipment = async (id) => {
  console.log('开始删除设备，设备ID：', id);
  try {
    const res = await wx.cloud.callFunction({
      name: 'deleteEquipment',
      data: { id }
    });
    console.log('删除设备成功，返回结果：', res.result);
    return res.result;
  } catch (error) {
    console.error('删除设备失败');
    console.error('设备ID：', id);
    console.error('错误详情：', error);
    console.error('错误时间：', new Date().toLocaleString());
    throw error;
  }
}; 