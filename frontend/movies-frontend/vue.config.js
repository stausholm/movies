module.exports = {
  chainWebpack: (config) => {
    // https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin
    // properties used in index.html
    config.plugin('html').tap((args) => {
      args[0].title = 'TODO';
      args[0].mortenTest = 'TODO';
      return args;
    });
  },
  pwa: {
    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    name: 'TODO',
  },
  css: { sourceMap: process.env.NODE_ENV === 'development' },
};
