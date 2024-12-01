// 云函数调用工具
function request(name, data = {}) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name,
      data
    })
    .then(res => {
      if (res.result.code === 0) {
        resolve(res.result.data)
      } else {
        reject(new Error(res.result.message || '请求失败'))
      }
    })
    .catch(error => {
      console.error('云函数调用失败:', error)
      reject(error)
    })
  })
}

module.exports = request 