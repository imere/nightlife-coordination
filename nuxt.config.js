module.exports = {
  head: {
    title: 'Nightlife Coordination',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'with=device-width, initial-scale=1.0' },
      { hid: 'description', name: 'description', content: 'nightlife coordination' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css', integrity: 'sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp', crossorigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'http://cdn.webfont.youziku.com/webfonts/nomal/110993/28831/5b16885df629d814c8ecd85a.css' }
     ],
     script: [
       { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js' }
     ],
     css: [
       { src: '~assets/main.scss', lang: 'scss' }
     ]
  },
  loading: '~/components/loading.vue',
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  route: {
    base: '/',
    middleware: [],
    routes: []
  },
  build: {
    vendor: ['axios'],
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
