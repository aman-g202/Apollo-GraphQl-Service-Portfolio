module.exports = {
  apps: [
    {
      script: "./app.js",
      env_stage: {
        name: "AMAN_PORTFOLIO_STAGE-3000",
        NODE_ENV: "staging",
      },
      env_prod: {
        name: "AMAN_PORTFOLIO_PROD-3001",
        NODE_ENV: "production",
      },
    },
  ],
};
