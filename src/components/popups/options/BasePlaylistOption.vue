<template>
  <BaseOption
    icon="playlist"
    :text="addText"
    @click="handleClick"
  />
</template>

<script>
import BaseOption from './BaseOption.vue'

export default {
  name: 'BasePlaylistOption',
  components: {
    BaseOption
  },
  inject: [
    'hidePopup'
  ],
  emits: [
    'click'
  ],
  computed: {
    addText () {
      return this.$t(
        'actions.addTo.playlist'
      )
    }
  },
  methods: {
    handleClick () {
      this.hidePopup()

      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
