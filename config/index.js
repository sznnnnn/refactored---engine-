const env = {
  development: {
    baseURL: 'http://localhost:3000',
  },
  production: {
    baseURL: 'https://api.yourcompany.com', // 生产环境域名
  },
  test: {
    baseURL: 'https://test-api.yourcompany.com', // 测试环境域名
  }
}

const getEnvConfig = () => {
  const accountInfo = wx.getAccountInfoSync()
  const envVersion = accountInfo.miniProgram.envVersion
  
  switch (envVersion) {
    case 'develop': return env.development
    case 'trial': return env.test
    case 'release': return env.production
    default: return env.development
  }
}

module.exports = getEnvConfig() 