<template>
  <a
    class="item"
    :class="{
      active: isActive
    }"
    @click="handleClick"
    v-text="tabName"
  />
</template>

<script>
export default {
  name: 'TabItem',
  props: {
    tabData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    activeTabIndex: {
      type: Number,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    isActive () {
      return (
        this.index ===
          this.activeTabIndex
      )
    },
    tabName () {
      return (
        this.tabData.name ||
          this.tabNameFormatted
      )
    },
    tabNameFormatted () {
      return this.$t(
        this.tabNameCode
      )
    },
    tabNameCode () {
      return this.tabData.nameCode
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click',
        this.index
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
