<template>
  <a
    class="item main-menu-item"
    :class="{
      'primary active': isActive
    }"
    @click="handleClick"
  >
    <BaseIcon
      v-if="icon"
      :icon="icon"
    />

    <span
      v-text="tabName"
    />

    <span
      v-if="counter"
      class="main-right-extrasmall-section"
      v-text="counterText"
    />
  </a>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'TabItem',
  components: {
    BaseIcon
  },
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
    },
    icon () {
      return this.tabData.icon
    },
    counter () {
      return this.tabData.counter
    },
    counterText () {
      return `(${this.counter})`
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
