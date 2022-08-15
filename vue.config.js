module.exports = {
  chainWebpack: config => {
    config.externals({
      vue: 'vue',
      vuex: 'vuex',
      quasar: 'quasar',
      'feathers-vuex': 'feathers-vuex',
      '@sparkz-community/common-client-lib': '@sparkz-community/common-client-lib',
    });
  }
};
