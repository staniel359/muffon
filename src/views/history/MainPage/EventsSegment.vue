<template>
  <BaseHistoryPaginatedSegmentContainer
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template
      #default="slotProps"
    >
      <BaseHistoryEventsSimpleList
        :events="slotProps[listScope]"
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
      scope: 'activity',
      listScope: 'events'
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
