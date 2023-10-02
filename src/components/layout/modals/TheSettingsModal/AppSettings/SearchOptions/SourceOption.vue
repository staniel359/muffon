<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="sourceText"
      />

      <SourceSelect />
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import SourceSelect from './SourceOption/SourceSelect.vue'

export default {
  name: 'SourceOption',
  components: {
    BaseHeader,
    SourceSelect
  },
  computed: {
    sourceText () {
      return this.$t(
        'settings.options.app.search.source'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
