module.exports = {
  chainWebpack: (config) => {
    // https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin
    // properties used in index.html
    config.plugin('html').tap((args) => {
      args[0].title = 'title test';
      args[0].mortenTest = 'mortenTest test';
      return args;
    });
  },
  pwa: {
    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    name: 'pwa name test',
  },
  css: { sourceMap: process.env.NODE_ENV === 'development' },
};
