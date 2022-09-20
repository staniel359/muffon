<template>
  <div
    class="ui secondary menu main-tabs"
    :class="{
      inverted: isDarkMode
    }"
  >
    <TabItem
      v-for="(tabData, index) in tabs"
      :key="index"
      :tab-data="tabData"
      :index="index"
      :active-tab-index="activeTabIndex"
      @click="handleTabClick"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import TabItem from './BaseTabs/TabItem.vue'

export default {
  name: 'BaseTabs',
  components: {
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
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    )
  },
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

<style lang="sass" scoped></style>
