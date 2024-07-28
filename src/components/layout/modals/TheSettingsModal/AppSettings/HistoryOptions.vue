<template>
  <div class="main-settings-options-block">
    <SearchSection />

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
import SearchSection from './HistoryOptions/SearchSection.vue'
import ActivitySection from './HistoryOptions/ActivitySection.vue'
import PlayerSection from './HistoryOptions/PlayerSection.vue'
import BrowserSection from './HistoryOptions/BrowserSection.vue'

export default {
  name: 'HistoryOptions',
  components: {
    SearchSection,
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
