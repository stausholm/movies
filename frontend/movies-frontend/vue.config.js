const {
  COLOR_THEME_STORAGE_KEY,
  COLOR_THEME_COLOR_STORAGE_KEY,
  APP_NAME,
  COLOR_THEME_DEFAULT,
  APP_CODE_URL,
  MANIFEST_DESCRIPTION,
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
                      .replace(/<h3>Added<\/h3>/gi, '<h3 class="added">Added</h3>')
                      .replace(/<h3>Changed<\/h3>/gi, '<h3 class="changed">Changed</h3>')
                      .replace(/<h3>Deprecated<\/h3>/gi, '<h3 class="deprecated">Deprecated</h3>')
                      .replace(/<h3>Removed<\/h3>/gi, '<h3 class="removed">Removed</h3>')
                      .replace(/<h3>Fixed<\/h3>/gi, '<h3 class="fixed">Fixed</h3>')
                      .replace(/<h3>Security<\/h3>/gi, '<h3 class="security">Security</h3>');
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
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-150x150.png',
      // generate new ones at https://realfavicongenerator.net/
      // and maskable variants at https://maskable.app/editor
      // info: https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs#changelog
    },
    workboxOptions: {
      exclude: [/\.map$/, /^manifest.*\.js$/, /\.htaccess$/, /img\/posters\/.*\.jpg$/], // TODO: posters are excluded from precache manifest
    },
    manifestOptions: {
      // https://developer.mozilla.org/en-US/docs/Web/Manifest
      background_color: COLOR_THEME_DEFAULT,
      lang: 'en',
      orientation: 'portrait',
      categories: ['utilities'],
      description: MANIFEST_DESCRIPTION,
      id: 'movies-db',
      start_url: './?source=pwa',
      screenshots: [
        {
          src: './img/screenshots/screenshot1-iphone12pro-586x1268.webp', // take new screenshots using chrome devtools' "capture screenshot" command
          sizes: '586x1268',
          type: 'image/webp',
          label: 'Movies list of Movies DB',
        },
        {
          src: './img/screenshots/screenshot2-iphone12pro-586x1268.webp',
          sizes: '586x1268',
          type: 'image/webp',
          label: 'Account page of Movies DB',
        },
      ],
      shortcuts: [
        {
          name: 'My library',
          short_name: 'Library',
          url: '/library?source=pwa',
          description: 'My entire library of content',
          icons: [{ src: './img/shortcuts/view-list-96x96.png', sizes: '96x96' }],
        },
        {
          name: 'My movies',
          short_name: 'Movies',
          url: '/find/movies?source=pwa',
          icons: [{ src: './img/shortcuts/view-list-96x96.png', sizes: '96x96' }],
        },
        {
          name: 'My starred content',
          short_name: 'Starred',
          url: '/account/starred?source=pwa',
          icons: [{ src: './img/shortcuts/star-96x96.png', sizes: '96x96' }],
        },
      ],
      share_target: {
        action: '/share-target/',
        method: 'GET',
        enctype: 'application/x-www-form-urlencoded',
        params: {
          title: 'shared_title',
          url: 'shared_url',
          text: 'shared_text',
          // files: 'shared_files',
        },
      },
    },
  },
  css: { sourceMap: process.env.NODE_ENV === 'development' },
};
