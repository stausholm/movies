// eslint-disable-next-line @typescript-eslint/no-var-requires
const { COLOR_THEME_STORAGE_KEY, APP_NAME } = require('./src/constants/SiteSettings.json');

module.exports = {
  chainWebpack: (config) => {
    // https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin
    // properties used in index.html
    config.plugin('html').tap((args) => {
      args[0].title = APP_NAME;
      args[0].colorThemeStorageKey = COLOR_THEME_STORAGE_KEY;
      return args;
    });
  },
  pwa: {
    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    name: APP_NAME,
  },
  css: { sourceMap: process.env.NODE_ENV === 'development' },
};
