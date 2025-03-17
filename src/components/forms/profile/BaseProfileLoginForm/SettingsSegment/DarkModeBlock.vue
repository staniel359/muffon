<template>
  <div class="main-toggle-container">
    <div
      class="text-section"
      v-text="optionText"
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
    optionText () {
      return this.$t(
        'settings.options.app.theme.dark'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
