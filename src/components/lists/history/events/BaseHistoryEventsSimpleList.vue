<template>
  <BaseListContainer
    class="divided"
  >
    <EventItem
      v-for="eventData in events"
      :key="eventData.uuid"
      :event-data="eventData"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import EventItem from './BaseHistoryEventsSimpleList/EventItem.vue'

export default {
  name: 'BaseHistoryEventsSimpleList',
  components: {
    BaseListContainer,
    EventItem
  },
  props: {
    events: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
