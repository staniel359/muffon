<template>
  <BaseMenuContainer
    class="secondary base-tabs main-top-section"
  >
    <TabItem
      v-for="(tabData, index) in tabs"
      :key="index"
      :tab-data="tabData"
      :index="index"
      :active-tab-index="activeTabIndex"
      @click="handleTabClick"
    />
  </BaseMenuContainer>
</template>

<script>
import BaseMenuContainer from '@/components/containers/BaseMenuContainer.vue'
import TabItem from './BaseTabs/TabItem.vue'

export default {
  name: 'BaseTabs',
  components: {
    BaseMenuContainer,
    TabItem
  },
  props: {
    tabs: {
      type: Array,
      default () {
        return []
      }
    },
    activeTabIndex: Number
  },
  emits: [
    'tabClick'
  ],
  methods: {
    handleTabClick (
      index
    ) {
      this.$emit(
        'tabClick',
        index
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.base-tabs
  &.secondary
    &:not(.pointing)
      :deep(.item)
        padding: 0.9rem 1.8rem
</style>
