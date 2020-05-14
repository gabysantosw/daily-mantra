<template>
  <p class="quote">
    <q class="quote__text">{{ quote }}</q>
    <span class="quote__author"> - {{ author }}</span>
  </p>
</template>

<script>
import { getQuote } from '@/shared/utils.js';

export default {
  props: {
    isNewDay: Boolean
  },
  created() {
    if (this.isNewDay) {
      fetch(
        `https://spreadsheets.google.com/feeds/cells/1pvRyFuJCqiNYIDVFR0PRQ2Fa9omLunTPN6pt-gAVL74/1/public/basic?alt=json`
      )
        .then(response => response.json())
        .then(data => {
          const todaysQuote = getQuote(data);
          localStorage.setItem('lastQuote', JSON.stringify(todaysQuote));
          this.author = todaysQuote[0];
          this.quote = todaysQuote[1];
        });
    } else {
      // get quote from localStorage
      const lastQuote = JSON.parse(localStorage.getItem('lastQuote'));
      this.author = lastQuote[0];
      this.quote = lastQuote[1];
    }
  },
  data() {
    return {
      author: '',
      quote: ''
    };
  }
};
</script>

<style lang="scss">
.quote {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: $display-font;

  animation: 1000ms 1000ms display backwards;

  &__text {
    padding: 0 0.5em;
    margin-top: auto;
    margin-bottom: 2em;
    font-size: 2.5rem;
    text-align: center;
  }
  &__author {
    align-self: flex-end;
    margin-top: auto;
    font-size: 1.25rem;
  }
}
</style>
