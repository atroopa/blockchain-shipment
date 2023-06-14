module.exports = {
  reactStrictMode: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // هر ثانیه یکبار تغییرات را بررسی کنید
      aggregateTimeout: 300, // بعد از 300 میلی‌ثانیه تغییرات را اعمال کنید
    };
    return config;
  },
};
