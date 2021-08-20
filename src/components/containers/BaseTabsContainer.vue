<template>
  <div class="main-tabs-container">
    <BaseTabs
      v-bind="$attrs"
      :tabs="tabs"
      :activeTabId="activeTabId"
      @tabClick="handleTabClick"
    />

    <div class="main-tab-container">
      <slot
        v-for="tabData in tabs"
        class="ui segment main-tab main-segment"
        :key="tabData.uuid"
        :name="tabData.scope"
        :class="{ active: isActive(tabData.uuid) }"
        :isActive="isActive(tabData.uuid)"
      />
    </div>
  </div>
</template>

<script>
import BaseTabs from '@/BaseTabs.vue'

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
      activeTabId: this.tabs[0].uuid
    }
  },
  methods: {
    handleTabClick (tabId) {
      this.setActiveTab(tabId)
    },
    isActive (tabId) {
      return tabId === this.activeTabId
    },
    setActiveTab (tabId) {
      this.activeTabId = tabId
    }
  }
}
</script>

<style lang="sass" scoped></style>
