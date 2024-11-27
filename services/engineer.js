// 工程师相关的API请求服务
// 本文件包含了所有与工程师验证相关的云函数调用

/**
 * 验证工程师身份
 * @param {string} phone - 工程师手机号
 * @returns {Promise} 返回验证结果
 */
export const verifyEngineer = async (phone) => {
  console.log('开始验证工程师身份，手机号：', phone);
  try {
    const res = await wx.cloud.callFunction({
      name: 'verifyEngineer',
      data: { phone }
    });
    console.log('工程师验证结果：', res.result);
    return res.result;
  } catch (error) {
    console.error('工程师验证失败');
    console.error('手机号：', phone);
    console.error('错误详情：', error);
    console.error('错误时间：', new Date().toLocaleString());
    throw error;
  }
}; 