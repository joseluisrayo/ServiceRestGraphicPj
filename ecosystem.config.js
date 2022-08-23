module.exports = {
  apps: [
    {
      name: "API_GRAPHIC_PJ-0",
      script: "./build/index.js",
      arg: "SERVICIO REST API - 0",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 4000
      }
    },
    {
      name: "API_GRAPHIC_PJ-1",
      script: "./build/index.js",
      arg: "SERVICIO REST API - 1",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 4001
      }
    },
    {
      name: "API_GRAPHIC_PJ-2",
      script: "./build/index.js",
      arg: "SERVICIO REST API - 2",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 4002
      }
    }
  ],
};
