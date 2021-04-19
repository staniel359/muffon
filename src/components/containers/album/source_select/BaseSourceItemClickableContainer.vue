<template>
  <div
    class="ui pointing left dropdown item main-dropdown-item"
    :class="{ disabled: isDisabled }"
    @click="handleClick"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseSourceItemClickableContainer',
  inject: [
    'setSelectedSourceData'
  ],
  props: {
    sourceId: {
      type: String,
      required: true
    },
    types: {
      type: Array,
      default () {
        return []
      }
    },
    isLoading: Boolean,
    isError: Boolean,
    albumsData: Object
  },
  computed: {
    isDisabled () {
      return (
        this.isLoading ||
          this.isError ||
          !this.albumsData
      )
    }
  },
  methods: {
    handleClick () {
      this.setSelectedSourceData({
        id: this.sourceId,
        types: this.types,
        albumsData: this.albumsData
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
