<template>
  <div
    class="main-tabs-container"
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

    <div class="main-tab-container">
      <slot
        v-for="(tabData, index) in tabs"
        class="ui segment main-tab main-segment"
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
import BaseTabs from '*/components/BaseTabs.vue'
import {
  numberToColumnWidth
} from '*/helpers/actions/plugins/semantic'

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
    isPointing: {
      type: Boolean,
      default: true
    },
    isFluid: Boolean,
    isVertical: Boolean
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
