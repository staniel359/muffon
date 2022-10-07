<template>
  <div class="main-settings-options-block">
    <CountryOption />
  </div>
</template>

<script>
import CountryOption from './TopOptions/CountryOption.vue'

export default {
  name: 'TopOptions',
  components: {
    CountryOption
  }
}
</script>

<style lang="sass" scoped></style>
