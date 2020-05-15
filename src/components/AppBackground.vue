<template>
  <div class="background"></div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-color: $light;
  background-image: url(https://images.unsplash.com/photo-1524311514036-57856b08ffd0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80);
  background-size: cover;
  // blend-mode: normal | multiply | screen | overlay | darken
  // | lighten | color-dodge | color-burn | hard-light
  // | soft-light | difference | exclusion | hue | saturation
  // | color | luminosity
  background-blend-mode: color-burn;
  opacity: 0.5;
  z-index: -1;
}
</style>
