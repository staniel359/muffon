<template>
  <BaseClearButton
    class="main-image-clear-button"
    @click="handleClick"
  />
</template>

<script>
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'

export default {
  name: 'ClearButton',
  components: {
    BaseClearButton
  },
  props: {
    imageId: {
      type: String,
      required: true
    }
  },
  computed: {
    deleteArgs () {
      return {
        imageId: this.imageId
      }
    }
  },
  methods: {
    handleClick () {
      window
        .mainProcess
        .sendCommand(
          'delete-background-image',
          this.deleteArgs
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
