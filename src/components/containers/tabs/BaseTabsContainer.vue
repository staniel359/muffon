<template>
  <div
    class="base-tabs-container plain-full"
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

    <div class="base-tab-container full-column relative">
      <slot
        v-for="(tabData, index) in tabs"
        class="ui segment base-tab main-segment no-shadow no-border no-margin height-100 width-100 plain-full background-transparent"
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

<style lang="sass" scoped></style>
