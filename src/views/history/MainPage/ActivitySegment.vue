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
  activity as formatHistoryActivityLink
} from '@/helpers/formatters/links/history'
import {
  events as eventsLimits
} from '@/helpers/data/limits'

export default {
  name: 'ActivitySegment',
  components: {
    BaseHistoryPaginatedSegmentContainer,
    BaseHistoryEventsSimpleList
  },
  data () {
    return {
      limit:
        eventsLimits.simple.small,
      scope: 'activity',
      listScope: 'events'
    }
  },
  computed: {
    headerLink () {
      return formatHistoryActivityLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
