module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/Sass/_variables.scss';`
      }
    }
  }
};
