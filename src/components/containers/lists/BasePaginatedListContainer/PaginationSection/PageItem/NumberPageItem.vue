<template>
  <a
    class="item main-menu-item"
    :class="{
      disabled: isDisabled,
      'primary active': isPageActive
    }"
    @click="handleClick"
    v-text="page"
  />
</template>

<script>
export default {
  name: 'NumberPageItem',
  props: {
    page: {
      type: Number,
      required: true
    },
    activePage: {
      type: Number,
      required: true
    },
    isDisabled: Boolean
  },
  emits: [
    'click'
  ],
  computed: {
    isPageActive () {
      return (
        !this.isDisabled &&
          this.isCurrentPage
      )
    },
    isCurrentPage () {
      return (
        this.page ===
          this.activePage
      )
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click',
        this.page
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
