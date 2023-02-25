<template>
  <BaseHistoryPageContainer
    :is-get-data="false"
  >
    <EventsSegment
      v-if="profileId"
    />

    <PlayerSegment />
  </BaseHistoryPageContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseHistoryPageContainer
  from '@/components/containers/pages/history/BaseHistoryPageContainer.vue'
import EventsSegment from './MainPage/EventsSegment.vue'
import PlayerSegment from './MainPage/PlayerSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseHistoryPageContainer,
    EventsSegment,
    PlayerSegment
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
