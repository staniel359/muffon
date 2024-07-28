<template>
  <div class="main-settings-section-container">
    <BaseDivider
      :text="headerText"
    />

    <div>
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

export default {
  name: 'ActivitySection',
  components: {
    BaseDivider,
    BaseSettingsHistoryDeleteOption
  },
  data () {
    return {
      scope: 'activity'
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
