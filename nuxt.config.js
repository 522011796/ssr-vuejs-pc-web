
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    bodyAttrs:{
      class: 'body-class'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/main.css',
    'mavon-editor/dist/css/index.css',
    'highlight.js/styles/monokai-sublime.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~plugins/iview', ssr: true},
    '~plugins/i18n',
    '~plugins/utils',
    '~plugins/moment',
    '~plugins/axios',
    '~plugins/validation',
    {src: '~/plugins/mavon-editor',ssr: false}
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/markdownit'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  markdownit: {
    preset: 'default',
    injected: true,
    linkify: true,
    breaks: true,
    use: [
      'markdown-it-emoji',
      'markdown-it-attrs',
      'markdown-it-mark',
      'markdown-it-deflist',
      'markdown-it-container',
      'markdown-it-katex',
      'markdown-it-link-attributes',
      'markdown-it-task-lists',
      'markdown-it-sub',
      'markdown-it-sup',
      'markdown-it-div',
      'markdown-it-table-of-contents'
    ],
    typographer: true,
    quotes: '“”‘’',
    highlight: function (str, lang) {
      return hljs.highlightAuto(str).value;
    }
  },
  proxy: [
    [
      '/proxy',
      {
        target: 'http://localhost:8360', // api主机
        /*pathRewrite: { '^/proxy' : '/' }*/
      }
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: ['axios','js-cookie','i18n','moment','utils'],
    extend(config, ctx) {
    }
  },
  router: {
    middleware: ['i18n','stats','auth']
  }
}
