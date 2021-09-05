<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="headerFormatted"
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
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'DataOptions',
  components: {
    BaseDivider,
    ClearCacheOption,
    ClearSearchHistoryOption
  },
  computed: {
    headerFormatted () {
      return localize(
        'layout.settings.sections.app.data'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
