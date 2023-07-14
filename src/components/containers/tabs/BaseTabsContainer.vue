<template>
  <div
    class="base-tabs-container"
    :class="{
      vertical: isVertical
    }"
  >
    <BaseTabs
      :class="{
        pointing: isPointing,
        [columnWidthFormatted]: isFluid,
        vertical: isVertical
      }"
      :tabs="tabs"
      :active-tab-index="activeTabIndex"
      @tab-click="handleTabClick"
    />

    <div class="base-tab-container">
      <slot
        v-for="(tabData, index) in tabs"
        class="ui segment base-tab main-segment"
        :name="index"
        :class="{
          active: isActive(index)
        }"
        :is-active="isActive(index)"
      />
    </div>
  </div>
</template>

<script>
import BaseTabs from '@/components/tabs/BaseTabs.vue'
import {
  numberToColumnWidth
} from '@/helpers/actions/plugins/semantic'

export default {
  name: 'BaseTabsContainer',
  components: {
    BaseTabs
  },
  props: {
    tabs: {
      type: Array,
      default () {
        return []
      }
    },
    isPointing: Boolean,
    isFluid: Boolean,
    isVertical: Boolean,
    itemsInRow: Number
  },
  emits: [
    'tabClick'
  ],
  data () {
    return {
      activeTabIndex: 0
    }
  },
  computed: {
    columnWidthFormatted () {
      return `${this.columnWidth} item`
    },
    columnWidth () {
      return numberToColumnWidth(
        this.itemsInRowComputed
      )
    },
    itemsInRowComputed () {
      return (
        this.itemsInRow ||
          this.tabsCount
      )
    },
    tabsCount () {
      return this.tabs.length
    }
  },
  methods: {
    handleTabClick (
      index
    ) {
      this.setActiveTab(
        index
      )

      this.$emit(
        'tabClick'
      )
    },
    isActive (
      index
    ) {
      return (
        index ===
          this.activeTabIndex
      )
    },
    setActiveTab (
      index
    ) {
      this.activeTabIndex = index
    }
  }
}
</script>

<style lang="sass" scoped>
.base-tabs-container
  @extend .flex-full, .d-flex
  &:not(.vertical)
    @extend .flex-column
    .base-tabs
      overflow-x: auto

.base-tab-container
  @extend .flex-full, .d-flex, .flex-column, .relative

::v-deep(.base-tab)
  @extend .no-shadow, .no-border, .no-margin, .h-100, .w-100, .d-flex, .flex-full, .background-transparent
  &:not(.main-settings-options-block)
    @extend .no-padding
  &:not(.active)
    @extend .d-none
  &.with-top-segment
    @extend .flex-column
</style>
