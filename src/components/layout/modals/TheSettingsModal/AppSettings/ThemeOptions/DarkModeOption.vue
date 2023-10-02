<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="darkModeText"
      />

      <BaseDarkModeToggle />
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseDarkModeToggle from '@/components/toggles/BaseDarkModeToggle.vue'

export default {
  name: 'DarkModeOption',
  components: {
    BaseHeader,
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

<style lang="sass" scoped></style>
