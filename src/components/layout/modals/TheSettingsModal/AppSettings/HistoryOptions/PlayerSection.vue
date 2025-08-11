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
import SaveOption from './PlayerSection/SaveOption.vue'

export default {
  name: 'PlayerSection',
  components: {
    BaseDivider,
    BaseSettingsHistoryDeleteOption,
    SaveOption
  },
  data () {
    return {
      scope: 'player'
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
