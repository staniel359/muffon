<template>
  <BaseHistoryPaginatedSegmentContainer
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template
      #default="slotProps"
    >
      <BaseHistoryEventsSimpleList
        :events="slotProps[scope]"
      />
    </template>
  </BaseHistoryPaginatedSegmentContainer>
</template>

<script>
import BaseHistoryPaginatedSegmentContainer
  from '@/components/containers/segments/history/BaseHistoryPaginatedSegmentContainer.vue'
import BaseHistoryEventsSimpleList
  from '@/components/lists/history/events/BaseHistoryEventsSimpleList.vue'
import {
  events as formatHistoryEventsLink
} from '@/helpers/formatters/links/history'

export default {
  name: 'EventsSegment',
  components: {
    BaseHistoryPaginatedSegmentContainer,
    BaseHistoryEventsSimpleList
  },
  data () {
    return {
      limit: 10,
      scope: 'events'
    }
  },
  computed: {
    headerLink () {
      return formatHistoryEventsLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
