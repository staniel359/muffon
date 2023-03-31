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
      <BaseRoutesSimpleList
        :routes="slotProps[listScope]"
      />
    </template>
  </BaseHistoryTabContainer>
</template>

<script>
import BaseHistoryTabContainer
  from '@/components/containers/tabs/history/BaseHistoryTabContainer.vue'
import BaseRoutesSimpleList
  from '@/components/lists/routes/BaseRoutesSimpleList.vue'
import {
  routes as routesLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'BrowserTab',
  components: {
    BaseHistoryTabContainer,
    BaseRoutesSimpleList
  },
  mixins: [
    tabMixin
  ],
  data () {
    return {
      limit:
        routesLimits.simple.small,
      scope: 'browser',
      listScope: 'routes'
    }
  }
}
</script>

<style lang="sass" scoped></style>
