<template>
  <div class="dark-mode-block">
    <div
      class="dark-mode-text"
      v-text="darkModeText"
    />

    <BaseDarkModeToggle />
  </div>
</template>

<script>
import BaseDarkModeToggle from '@/components/toggles/BaseDarkModeToggle.vue'

export default {
  name: 'DarkModeBlock',
  components: {
    BaseDarkModeToggle
  },
  computed: {
    darkModeText () {
      return this.$t(
        'settings.options.app.theme.dark'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.dark-mode-block
  @extend .d-flex, .align-items-center

.dark-mode-text
  margin-right: 0.5em
</style>
