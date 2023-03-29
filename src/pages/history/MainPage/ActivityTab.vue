<template>
  <BaseHistoryTabContainer
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseHistoryEventsSimpleList
        :events="slotProps[listScope]"
      />
    </template>
  </BaseHistoryTabContainer>
</template>

<script>
import BaseHistoryTabContainer
  from '@/components/containers/tabs/history/BaseHistoryTabContainer.vue'
import BaseHistoryEventsSimpleList
  from '@/components/lists/history/events/BaseHistoryEventsSimpleList.vue'
import {
  events as eventsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'ActivityTab',
  components: {
    BaseHistoryTabContainer,
    BaseHistoryEventsSimpleList
  },
  mixins: [
    tabMixin
  ],
  data () {
    return {
      limit:
        eventsLimits.simple.small,
      scope: 'activity',
      listScope: 'events'
    }
  }
}
</script>

<style lang="sass" scoped></style>
