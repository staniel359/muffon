<template>
  <div
    class="ui secondary pointing menu"
    :class="{ inverted: isDarkMode }"
  >
    <TabItem
      v-for="tabData in tabs"
      :key="tabData.uuid"
      :tabData="tabData"
      :activeTabId="activeTabId"
      @click="handleTabClick"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TabItem from './BaseTabs/TabItem.vue'

export default {
  name: 'BaseTabs',
  components: {
    TabItem
  },
  emits: [
    'tabClick'
  ],
  props: {
    tabs: {
      type: Array,
      default () {
        return []
      }
    },
    activeTabId: String
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  },
  methods: {
    handleTabClick (tabId) {
      this.$emit('tabClick', tabId)
    }
  }
}
</script>

<style lang="sass" scoped></style>
