<template>
  <div>
    <BaseTabs
      :tabs="tabs"
      :activeTabId="activeTabId"
      @tabClick="handleTabClick"
    />

    <slot
      v-for="tabData in tabs"
      class="ui tab"
      :key="tabData.uuid"
      :name="tabData.scope"
      :class="{ active: isActive(tabData.uuid) }"
      :isActive="isActive(tabData.uuid)"
    />
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
      this.activeTabId = tabId
    },
    isActive (tabId) {
      return tabId === this.activeTabId
    }
  }
}
</script>

<style lang="sass" scoped></style>
