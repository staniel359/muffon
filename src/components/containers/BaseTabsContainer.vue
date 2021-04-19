<template>
  <div class="tabs-container">
    <div class="ui secondary pointing menu">
      <a
        v-for="tabData in tabs"
        class="item menu-tab"
        :key="tabData.uuid"
        :class="{ active: isActive(tabData.uuid) }"
        @click="handleTabClick(tabData.uuid)"
      >
        {{ tabData.name }}
      </a>
    </div>

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
export default {
  name: 'BaseTabsContainer',
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
      activeId: this.tabs[0].uuid
    }
  },
  methods: {
    handleTabClick (tabId) {
      this.activeId = tabId
    },
    isActive (tabId) {
      return tabId === this.activeId
    }
  }
}
</script>

<style lang="sass" scoped></style>
