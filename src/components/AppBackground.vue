<template>
  <div class="background"></div>
</template>

<script>
import { randomNumber } from '@/shared/utils.js';

export default {
  props: {
    isNewDay: Boolean
  },
  created() {
    if (this.isNewDay) {
      // get random background
      const randomColor = this.palette[randomNumber(this.palette.length)];
      const randomTexture = this.textures[randomNumber(this.textures.length)];

      this.setProperty('color', randomColor);
      this.setProperty('color', randomTexture);

      // save to localStorage
      localStorage.setItem(
        'lastBackground',
        JSON.stringify([randomColor, randomTexture])
      );
    } else {
      // get background from localStorage
      const lastBackground = JSON.parse(localStorage.getItem('lastBackground'));

      this.setProperty('color', lastBackground[0]);
      this.setProperty('texture', lastBackground[1]);
    }
  },
  data() {
    return {
      palette: [
        'hsl(130, 60%, 85%)', // green
        'hsl(255, 60%, 90%)', // purple
        'hsl(310, 60%, 90%)', // magenta
        'hsl(0, 60%, 85%)', // red
        'hsl(55, 60%, 90%)', // yellow
        'hsl(130, 60%, 85%)', // cyan
        'hsl(185, 60%, 80%)', // orange
        'hsl(210, 60%, 80%)' // blue
      ],
      textures: [
        'https://images.unsplash.com/photo-1524311514036-57856b08ffd0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
        'https://images.unsplash.com/photo-1578922427371-4d71df626f5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1578922348103-46c3a7ebdd86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        'https://images.unsplash.com/photo-1546370835-6a8a2d22eb70?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1528459061998-56fd57ad86e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=619&q=80',
        'https://images.unsplash.com/photo-1544477534-21604bfa208d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        'https://images.unsplash.com/photo-1543589076-96421b4e2f1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        'https://images.unsplash.com/photo-1537355656354-a2f2eeabcfc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
      ]
    };
  },
  methods: {
    setProperty(name, value) {
      if (name === 'texture') {
        document.documentElement.style.setProperty(
          '--backgroundTexture',
          `url(${value})`
        );
      } else if (name === 'color') {
        document.documentElement.style.setProperty(
          '--backgroundColor',
          `${value}`
        );
      }
    }
  }
};
</script>

<style lang="scss">
:root {
  // default styles
  --backgroundColor: $light;
  --backgroundTexture: url('https://images.unsplash.com/photo-1524311514036-57856b08ffd0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80');
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-color: var(--backgroundColor);
  z-index: -1;

  animation: 1000ms display forwards;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-image: var(--backgroundTexture);
    background-size: cover;
    // blend-mode: normal | multiply | screen | overlay | darken
    // | lighten | color-dodge | color-burn | hard-light
    // | soft-light | difference | exclusion | hue | saturation
    // | color | luminosity
    background-blend-mode: color-burn;
    filter: grayscale(100%);
    opacity: 0.2;
  }
}
</style>
