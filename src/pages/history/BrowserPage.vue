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
      <BaseRoutesSimpleList
        :routes="slotProps[listScope]"
      />
    </template>
  </BaseHistoryPaginatedPageContainer>
</template>

<script>
import BaseHistoryPaginatedPageContainer
  from '@/components/containers/pages/history/BaseHistoryPaginatedPageContainer.vue'
import BaseRoutesSimpleList
  from '@/components/lists/routes/BaseRoutesSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import pageMixin from '@/mixins/pageMixin'
import {
  routes as routesLimits
} from '@/helpers/data/limits'

export default {
  name: 'BrowserPage',
  components: {
    BaseHistoryPaginatedPageContainer,
    BaseRoutesSimpleList
  },
  mixins: [
    orderChangeMixin,
    pageMixin
  ],
  data () {
    return {
      limit:
        routesLimits.simple.large,
      scope: 'browser',
      listScope: 'routes',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
