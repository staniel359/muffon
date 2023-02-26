<template>
  <BaseHistoryPageContainer
    :is-get-data="false"
  >
    <ActivitySegment
      v-if="profileId"
    />

    <PlayerSegment />

    <BrowserSegment />
  </BaseHistoryPageContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseHistoryPageContainer
  from '@/components/containers/pages/history/BaseHistoryPageContainer.vue'
import ActivitySegment from './MainPage/ActivitySegment.vue'
import PlayerSegment from './MainPage/PlayerSegment.vue'
import BrowserSegment from './MainPage/BrowserSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseHistoryPageContainer,
    ActivitySegment,
    PlayerSegment,
    BrowserSegment
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
