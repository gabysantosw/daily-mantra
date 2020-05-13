<template>
  <div>
    <p>
      <q>{{ quote }}</q>
      <span> - {{ author }}</span>
    </p>
  </div>
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

<style lang="scss"></style>
