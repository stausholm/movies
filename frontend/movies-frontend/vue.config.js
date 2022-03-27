const {
  COLOR_THEME_STORAGE_KEY,
  COLOR_THEME_COLOR_STORAGE_KEY,
  APP_NAME,
  COLOR_THEME_DEFAULT,
  APP_CODE_URL,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('./src/constants/SiteSettings.json');

module.exports = {
  chainWebpack: (config) => {
    // https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin
    // properties used in index.html
    config.plugin('html').tap((args) => {
      args[0].title = APP_NAME;
      args[0].colorThemeStorageKey = COLOR_THEME_STORAGE_KEY;
      args[0].colorThemeColorStorageKey = COLOR_THEME_COLOR_STORAGE_KEY;
      args[0].repositoryUrl = APP_CODE_URL;
      return args;
    });
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/i,
          use: [
            {
              loader: 'html-loader',
              options: {
                preprocessor: (content, loaderContext) => {
                  let result;

                  try {
                    result = content
                      .replace('<h3>Added</h3>', '<h3 class="added">Added</h3>')
                      .replace('<h3>Changed</h3>', '<h3 class="changed">Changed</h3>')
                      .replace('<h3>Deprecated</h3>', '<h3 class="deprecated">Deprecated</h3>')
                      .replace('<h3>Removed</h3>', '<h3 class="removed">Removed</h3>')
                      .replace('<h3>Fixed</h3>', '<h3 class="fixed">Fixed</h3>')
                      .replace('<h3>Security</h3>', '<h3 class="security">Security</h3>');
                  } catch (error) {
                    loaderContext.emitError(error);

                    return content;
                  }

                  return result;
                },
              },
            },
            {
              loader: 'markdown-loader',
              options: {
                // Pass options to marked
                // See https://marked.js.org/using_advanced#options
                headerIds: false,
              },
            },
          ],
        },
      ],
    },
  },
  pwa: {
    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    name: APP_NAME,
    themeColor: COLOR_THEME_DEFAULT,
  },
  css: { sourceMap: process.env.NODE_ENV === 'development' },
};
