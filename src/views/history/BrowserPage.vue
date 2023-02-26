<template>
  <BaseHistoryPaginatedPageContainer
    model="event"
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :order="order"
    :is-get-data="!!profileId"
    is-with-top-segment
    is-with-order-change
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
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseHistoryPaginatedPageContainer
  from '@/components/containers/pages/history/BaseHistoryPaginatedPageContainer.vue'
import BaseRoutesSimpleList
  from '@/components/lists/routes/BaseRoutesSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'

export default {
  name: 'BrowserPage',
  components: {
    BaseHistoryPaginatedPageContainer,
    BaseRoutesSimpleList
  },
  mixins: [
    orderChangeMixin
  ],
  data () {
    return {
      limit: 50,
      scope: 'browser',
      listScope: 'routes',
      order: 'createdDesc'
    }
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
