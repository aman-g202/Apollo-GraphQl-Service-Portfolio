module.exports = {
  apps: [
    {
      script: "./app.mjs",
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      env_stage: {
        name: "AMAN_PORTFOLIO_STAGE-3000",
        NODE_ENV: "staging",
      },
      env_prod: {
        name: "AMAN_PORTFOLIO_PROD-3040",
        NODE_ENV: "production",
      },
    },
  ],
};
