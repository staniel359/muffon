<template>
  <div class="main-settings-options-block">
    <BaseSettingsHistoryDeleteOption
      v-if="profileId"
      scope="activity"
    />

    <BaseSettingsHistoryDeleteOption
      scope="player"
    />

    <BaseSettingsHistoryDeleteOption
      scope="browser"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseSettingsHistoryDeleteOption
  from '@/components/settings/BaseSettingsHistoryDeleteOption.vue'

export default {
  name: 'HistoryOptions',
  components: {
    BaseSettingsHistoryDeleteOption
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    )
  }
}
</script>

<style lang="sass" scoped></style>
