<template>
  <div
    class="ui secondary pointing menu"
    :class="{ inverted: isDarkMode }"
  >
    <TabItem
      v-for="(tabData, index) in tabs"
      :key="tabData.uuid"
      :tabName="tabData.name"
      :index="index"
      :activeTabIndex="activeTabIndex"
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
    activeTabIndex: Number
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  },
  methods: {
    handleTabClick (index) {
      this.$emit(
        'tabClick',
        index
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
