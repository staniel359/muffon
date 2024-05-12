<template>
  <BaseHistoryPaginatedPageContainer
    :key="refreshKey"
    model="event"
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
    is-with-reload-button
  >
    <template
      #default="slotProps"
    >
      <BaseHistoryEventsSimpleList
        :events="slotProps[listScope]"
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
import pageMixin from '@/mixins/pageMixin'
import {
  events as eventsLimits
} from '@/helpers/data/limits'

export default {
  name: 'ActivityPage',
  components: {
    BaseHistoryPaginatedPageContainer,
    BaseHistoryEventsSimpleList
  },
  mixins: [
    orderChangeMixin,
    pageMixin
  ],
  data () {
    return {
      limit:
        eventsLimits.simple.large,
      scope: 'activity',
      listScope: 'events',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
