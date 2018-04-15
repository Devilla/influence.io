module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name      : 'frontend',
      script    : 'npm run start:production',
      // args      : '',
      env: {
        NODE_ENV: 'development'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ]
};
