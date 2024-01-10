"use strict";

module.exports = {
  apps: [{
    name: 'app',
    script: './build/../build/index.js',
    instances: 1,
    exec_interpreter: 'babel-node',
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    node_args: ['-r', 'newrelic']
  }]
};