<template>
  <header class="header">
    <img class="header__logo" alt="Daily Mantra." src="@/assets/logo.svg" />
    <time class="header__date" dataset="2020-05-12">{{ displayDate }}</time>
  </header>
</template>

<script>
export default {
  props: {
    currentDate: Date
  },
  computed: {
    displayDate() {
      return `${this.currentDay}/${this.currentMonth}/${this.currentYear}`;
    },
    machineDate() {
      return `${this.currentYear}-${this.currentMonth}-${this.currentday}`;
    },
    currentDay() {
      let day = this.currentDate.getDate();
      if (day < 10) day = `0${day}`;
      return day;
    },
    currentMonth() {
      let month = this.currentDate.getMonth() + 1;
      if (month < 10) month = `0${month}`;
      return month;
    },
    currentYear() {
      return this.currentDate.getFullYear();
    }
  }
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: $main-pad;

  &__logo {
    width: 3rem;
    height: 2rem;
  }
  &__date {
    font-size: 1rem;
    font-family: $mono-font;
  }
}
</style>
