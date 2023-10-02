<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="scopeText"
      />

      <ScopeSelect />
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import ScopeSelect from './ScopeOption/ScopeSelect.vue'

export default {
  name: 'ScopeOption',
  components: {
    BaseHeader,
    ScopeSelect
  },
  computed: {
    scopeText () {
      return this.$t(
        'settings.options.app.search.scope'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
