<template>
  <div class="main-tabs-container">
    <BaseTabs
      v-bind="$attrs"
      :tabs="tabs"
      :activeTabIndex="activeTabIndex"
      @tabClick="handleTabClick"
    />

    <div class="main-tab-container">
      <slot
        v-for="(tabData, index) in tabs"
        class="ui segment main-tab main-segment"
        :key="tabData.uuid"
        :name="tabData.scope"
        :class="{ active: isActive(index) }"
        :isActive="isActive(index)"
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
  data () {
    return {
      activeTabIndex: 0
    }
  },
  methods: {
    handleTabClick (index) {
      this.setActiveTab(index)
    },
    isActive (index) {
      return index === this.activeTabIndex
    },
    setActiveTab (index) {
      this.activeTabIndex = index
    }
  }
}
</script>

<style lang="sass" scoped></style>
