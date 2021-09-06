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
    tabName: {
      type: String,
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
