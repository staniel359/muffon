<template>
  <a
    class="item"
    :class="{ active: isActive }"
    @click="handleClick"
  >
    {{ tabName }}
  </a>
</template>

<script>
export default {
  name: 'TabItem',
  props: {
    tabData: {
      type: Object,
      required: true
    },
    activeTabId: {
      type: String,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    isActive () {
      return this.tabId === this.activeTabId
    },
    tabId () {
      return this.tabData.uuid
    },
    tabName () {
      return this.tabData.name
    }
  },
  methods: {
    handleClick () {
      this.$emit('click', this.tabId)
    }
  }
}
</script>

<style lang="sass" scoped></style>
