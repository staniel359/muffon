<template>
  <div class="main-settings-section-container">
    <BaseDivider
      :text="headerText"
    />

    <div>
      <SaveOption />

      <BaseSettingsHistoryDeleteOption
        :scope="scope"
      />
    </div>
  </div>
</template>

<script>
import BaseDivider from '@/components/BaseDivider.vue'
import BaseSettingsHistoryDeleteOption
  from '@/components/settings/BaseSettingsHistoryDeleteOption.vue'
import SaveOption from './BrowserSection/SaveOption.vue'

export default {
  name: 'BrowserSection',
  components: {
    BaseDivider,
    BaseSettingsHistoryDeleteOption,
    SaveOption
  },
  data () {
    return {
      scope: 'browser'
    }
  },
  computed: {
    headerText () {
      return this.$t(
        `navigation.${this.scope}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
