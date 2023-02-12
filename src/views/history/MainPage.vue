<template>
  <BaseHistoryPageContainer
    :is-get-data="false"
  >
    <EventsSegment
      v-if="profileId"
    />
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

export default {
  name: 'MainPage',
  components: {
    BaseHistoryPageContainer,
    EventsSegment
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
