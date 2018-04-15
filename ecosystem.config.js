// Target server hostname or IP address
const TARGET_SERVER_HOST = process.env.TARGET_SERVER_HOST ? process.env.TARGET_SERVER_HOST.trim() : '';
// Target server username
const TARGET_SERVER_USER = process.env.TARGET_SERVER_USER ? process.env.TARGET_SERVER_USER.trim() : '';
// Target server application path
const TARGET_SERVER_APP_PATH = `/home/${TARGET_SERVER_USER}/app`;
// Your repository
const REPO = 'git@gitlab.com:useinfluence/proof.io.git';

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'proof.io',
      script: 'server.js',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 1337
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: TARGET_SERVER_USER,
      host: TARGET_SERVER_HOST,
      ref: 'origin/master',
      pre_setup: 'sudo docker-compose -f stack-docker/docker-compose.yml up -d',
      repo: REPO,
      ssh_options: 'StrictHostKeyChecking=no',
      path: TARGET_SERVER_APP_PATH,
      'post-deploy': 'npm install --production'
      + ' && pm2 startOrRestart ecosystem.config.js --env=production'
      + ' && pm2 save'
      + ' && cd public/frontend '
      + ' && npm install'
      + ' && pm2 startOrRestart ecosystem.config.js --env=production'
    }
  }
};
