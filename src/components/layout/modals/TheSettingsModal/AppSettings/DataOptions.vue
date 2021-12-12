<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="dataText"
      isHorizontal
    />

    <ClearCacheOption />
    <ClearSearchHistoryOption />
  </div>
</template>

<script>
import BaseDivider from '@/BaseDivider.vue'
import ClearCacheOption from './DataOptions/ClearCacheOption.vue'
import ClearSearchHistoryOption
  from './DataOptions/ClearSearchHistoryOption.vue'

export default {
  name: 'DataOptions',
  components: {
    BaseDivider,
    ClearCacheOption,
    ClearSearchHistoryOption
  },
  computed: {
    dataText () {
      return this.$t(
        'layout.settings.sections.app.data'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
