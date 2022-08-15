const { resolve } = require('path')

module.exports = {
  base: '/',
  title: 'My Library',
  description: 'Just playing around',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/' },
      { text: 'Github', link: 'https://gitlab.com/iy4u/roles-client-lib' },
    ],
    sidebar: [
      {
        title: 'Introduction',
        collapsable: false,
        children: [
          'introduction/guide'
        ]
      },
      {
        title: 'Components',
        collapsable: false,
        children: [
          'components/component-a',
          'components/component-b'
        ]
      }
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@sparkz-community/roles-client-lib': resolve(__dirname, '../../src')
      }
    }
  }
}
