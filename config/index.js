const config = {
  // 开发环境配置
  development: {
    baseUrl: 'http://localhost:3000',
    env: 'development'
  },
  // 生产环境配置
  production: {
    baseUrl: 'https://api.example.com',
    env: 'production'
  }
}

// 根据环境导出相应配置
export default config[process.env.NODE_ENV || 'development'] 