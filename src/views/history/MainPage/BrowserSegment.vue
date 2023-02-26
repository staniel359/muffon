<template>
  <BaseHistoryPaginatedSegmentContainer
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :header-link="headerLink"
    :is-get-data="!!profileId"
  >
    <template
      #default="slotProps"
    >
      <BaseRoutesSimpleList
        :routes="slotProps[listScope]"
      />
    </template>
  </BaseHistoryPaginatedSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseHistoryPaginatedSegmentContainer
  from '@/components/containers/segments/history/BaseHistoryPaginatedSegmentContainer.vue'
import BaseRoutesSimpleList
  from '@/components/lists/routes/BaseRoutesSimpleList.vue'
import {
  browser as formatHistoryBrowserLink
} from '@/helpers/formatters/links/history'

export default {
  name: 'BrowserSegment',
  components: {
    BaseHistoryPaginatedSegmentContainer,
    BaseRoutesSimpleList
  },
  data () {
    return {
      limit: 10,
      scope: 'browser',
      listScope: 'routes'
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    headerLink () {
      return formatHistoryBrowserLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
