<template>
  <BaseHistoryPaginatedPageContainer
    model="event"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
  >
    <template
      #default="slotProps"
    >
      <BaseHistoryEventsSimpleList
        :events="slotProps[scope]"
      />
    </template>
  </BaseHistoryPaginatedPageContainer>
</template>

<script>
import BaseHistoryPaginatedPageContainer
  from '@/components/containers/pages/history/BaseHistoryPaginatedPageContainer.vue'
import BaseHistoryEventsSimpleList
  from '@/components/lists/history/events/BaseHistoryEventsSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'

export default {
  name: 'EventsPage',
  components: {
    BaseHistoryPaginatedPageContainer,
    BaseHistoryEventsSimpleList
  },
  mixins: [
    orderChangeMixin
  ],
  data () {
    return {
      limit: 50,
      scope: 'events',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
