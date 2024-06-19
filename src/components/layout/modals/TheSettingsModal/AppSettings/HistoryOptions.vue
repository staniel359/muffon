<template>
  <div class="main-settings-options-block">
    <ActivitySection
      v-if="profileId"
    />

    <PlayerSection />

    <BrowserSection />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import ActivitySection from './HistoryOptions/ActivitySection.vue'
import PlayerSection from './HistoryOptions/PlayerSection.vue'
import BrowserSection from './HistoryOptions/BrowserSection.vue'

export default {
  name: 'HistoryOptions',
  components: {
    ActivitySection,
    PlayerSection,
    BrowserSection
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
