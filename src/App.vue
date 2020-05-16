<template>
  <div id="app" class="wrapper">
    <AppBackground :isNewDay="isNewDay" />
    <div class="content">
      <AppHeader :currentDate="currentDate" />
      <AppQuote :isNewDay="isNewDay" />
    </div>
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
    // get innerHeight from window
    window.addEventListener('load', () => {
      let innerHeight = window.innerHeight;
      document.documentElement.style.setProperty(
        '--fullHeight',
        `${innerHeight}px`
      );
    });

    // handle window resizes
    window.addEventListener('resize', () => {
      let innerHeight = window.innerHeight;
      document.documentElement.style.setProperty(
        '--fullHeight',
        `${innerHeight}px`
      );
    });

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

:root {
  --fullHeight: 100vh;
}

body {
  background-color: $light;
  font-family: $mono-font;
  color: $dark;
}

// .wrapper {
//   // position: relative;
//   // overflow: hidden;

//   // &:after {
//   //   content: '';
//   //   position: absolute;
//   //   left: 0;
//   //   top: 12vh;

//   //   width: 100%;
//   //   height: 100%;
//   //   background-color: $dark;
//   //   border-radius: 10vh 10vh 0 0;

//   //   animation: 1000ms reveal forwards;
//   // }
// }

.content {
  display: flex;
  flex-direction: column;

  width: 40rem;
  max-width: 100%;
  min-height: 100vh; // fallback
  min-height: var(--fullHeight);
  margin: 0 auto;
  padding: $main-pad;
  box-sizing: border-box;

  animation: 1000ms display backwards;
}

// @keyframes reveal {
//   50% {
//     opacity: 1;
//   }
//   100% {
//     opacity: 0;
//     transform: translateY(100%);
//   }
// }
</style>
