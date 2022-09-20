<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="languageText"
    />

    <BaseLanguageDropdown />
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseLanguageDropdown
  from '@/components/dropdowns/BaseLanguageDropdown.vue'

export default {
  name: 'LanguageOption',
  components: {
    BaseHeader,
    BaseLanguageDropdown
  },
  computed: {
    languageText () {
      return this.$t(
        'settings.options.app.interface.language'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
