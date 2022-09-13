<template>
  <div
    class="item"
    @click="handleClick"
  >
    <BaseIcon
      icon="file audio"
    />

    {{ addText }}
  </div>
</template>

<script>
import BaseIcon from '*/components/BaseIcon.vue'

export default {
  name: 'BasePlaylistOption',
  components: {
    BaseIcon
  },
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
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
