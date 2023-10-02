<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="languageText"
      />

      <BaseLanguageSelect />
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseLanguageSelect from '@/components/selects/BaseLanguageSelect.vue'

export default {
  name: 'LanguageOption',
  components: {
    BaseHeader,
    BaseLanguageSelect
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
