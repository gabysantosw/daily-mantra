<template>
  <p class="quote">
    <span class="alert" v-if="!successfulLoad">
      The quotes are not loading right now, sorry! :( Still, I hope you:</span
    >
    <q class="quote__text">{{ quote }}</q>
    <span class="quote__author"> - {{ author }}</span>
  </p>
</template>

<script>
import { handleSheet, randomNumber } from '@/shared/utils.js';

const getQuote = data => {
  const quoteList = handleSheet(data);
  const selectedIndex = randomNumber(quoteList.length);
  return quoteList[selectedIndex];
};

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
          this.successfulLoad = true;
        })
        .catch(error => {
          this.successfulLoad = false;
          console.error(error);
        });
    } else {
      this.successfulLoad = true;
      // get quote from localStorage
      const lastQuote = JSON.parse(localStorage.getItem('lastQuote'));
      this.author = lastQuote[0];
      this.quote = lastQuote[1];
    }
  },
  data() {
    return {
      // default quote
      author: 'Me',
      quote: 'Have a great day!',
      successfulLoad: false
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
    padding: 0 0.5em 1em 0.5em;
    margin: auto 0;
    font-size: calc(2rem + 1vh);
    text-align: center;
  }
  &__author {
    align-self: flex-end;
    font-size: 1.25rem;
  }
}
.alert {
  position: absolute;
  top: 30vh;
  width: 40ch;
  max-width: 100%;
  font-family: $mono-font;
  text-align: center;
}
</style>
