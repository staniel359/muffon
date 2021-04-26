<template>
  <BaseButton
    class="red basic compact right floated"
    icon="close"
    text="Reset"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/BaseButton.vue'

export default {
  name: 'ResetButton',
  components: {
    BaseButton
  },
  inject: [
    'resetAlbum'
  ],
  methods: {
    handleClick () {
      this.resetAlbum()
    }
  }
}
</script>

<style lang="sass" scoped></style>
