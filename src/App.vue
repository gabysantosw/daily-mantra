<template>
  <div id="app">
    <AppHeader :currentDate="currentDate" />
    <AppQuote :isNewDay="isNewDay" />
    <AppBackground />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import AppQuote from './components/AppQuote';
import AppBackground from './components/AppBackground';

export default {
  name: 'App',
  // on creation: compare currentDate with localStorage date
  // if its a new day -> new quote
  // if not -> same quote
  components: { AppHeader, AppBackground, AppQuote },
  created() {
    // check localStorage
    let lastDate = new Date(JSON.parse(localStorage.getItem('lastDate')));
    this.currentDate = new Date();

    // compare localStorage (lastDate) date with currentDate
    if (lastDate.getDate() === this.currentDate.getDate()) {
      // same day => quote doesn't change
      this.isNewDay = false;
    }
    localStorage.setItem('lastDate', JSON.stringify(this.currentDate));
  },
  data() {
    return {
      currentDate: null,
      isNewDay: true
    };
  }
};
</script>

<style lang="scss">
@import '@/Sass/main.scss';

body {
  background-color: $light;
  font-family: $mono-font;
  color: $dark;
}
</style>
