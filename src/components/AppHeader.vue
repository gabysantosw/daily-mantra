<template>
  <header class="header">
    <img class="header__logo" alt="Vue logo" src="@/assets/logo.png" />
    <time class="header__time" dataset="2020-05-12">{{ displayDate }}</time>
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
  &__logo {
    width: 2rem;
    height: 2rem;
  }
  // &__time {

  // }
}
</style>
