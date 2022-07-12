<template>
  <div class="main-tabs-container">
    <BaseTabs
      v-bind="$attrs"
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
    }
  },
  emits: [
    'tabClick'
  ],
  data () {
    return {
      activeTabIndex: 0
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
