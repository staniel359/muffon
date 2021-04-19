<template>
  <div class="search-tabs-container">
    <BaseTabsContainer :tabs="tabsFormatted">
      <template
        v-for="tabData in tabsFormatted"
        :key="tabData.uuid"
        #[tabData.scope]="tabsSlotProps"
      >
        <BaseSearchTabContainer
          :key="searchKey"
          :class="tabsSlotProps.class"
          :isActive="tabsSlotProps.isActive"
          :query="query"
          :tabData="tabData"
        />
      </template>
    </BaseTabsContainer>
  </div>
</template>

<script>
import BaseTabsContainer from '@/containers/BaseTabsContainer.vue'
import BaseSearchTabContainer from '@/containers/BaseSearchTabContainer.vue'
import tabs from '#/data/searchTabs'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'SearchTabs',
  components: {
    BaseTabsContainer,
    BaseSearchTabContainer
  },
  props: {
    query: String,
    searchKey: String
  },
  computed: {
    tabsFormatted () {
      return formatCollection(tabs)
    }
  }
}
</script>

<style lang="sass" scoped>
.search-tabs-container
  @extend .d-flex, .flex-column, .flex-full
  margin-top: 5px

.tabs-container
  @extend .d-flex, .flex-column, .flex-full
</style>
