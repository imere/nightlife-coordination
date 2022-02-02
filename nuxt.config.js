import * as bodyParser from 'body-parser'
import session from 'express-session'
import connect from 'connect-mongo'

import * as ENV from './config/env'

const MongoStore = connect(session)

export default {
  head: {
    title: 'Nightlife Coordination',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'with=device-width, initial-scale=1.0' },
      { hid: 'description', name: 'description', content: 'nightlife coordination' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/font-awesome/5.1.0/css/all.css', integrity: 'sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp', crossorigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.1.0/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Courgette' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Tauri' }
    ],
    script: [
      { src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.3.1/jquery.min.js' }
    ]
  },
  css: [
    { src: '~/assets/main.scss', lang: 'scss' }
  ],
  loading: '~/components/loading.vue',
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  serverMiddleware: [
    bodyParser.json(),
    session({
      secret: 'cab98d7bfca9e7bed09aef',
      resave: true,
      saveUninitialized: false,
      store: new MongoStore({
        url: ENV.suri || 'mongodb://127.0.0.1:27017/sessions',
        ttl: 60 * 60
      })
    }),
    '~/router/index.js'
  ],
  plugins: [
    { src: '~/plugins/vue-notification', ssr: false },
    { src: '~/plugins/v-focus', ssr: false }
  ],
  route: {
    base: '/'
  },
  buildModules: [
    [
      '@nuxtjs/eslint-module', {
        fix: true
      }
    ],
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    sass: [],
    scss: ['~/assets/conf.scss'],
    less: [],
    stylus: []
  }
}
