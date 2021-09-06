<template>
  <BaseButton
    class="red basic compact small delete-button"
    icon="close"
    :text="textFormatted"
    @click="handleClick"
  />

  <DeleteModal
    ref="modal"
    :recommendationData="recommendationData"
    @deleted="handleDeleted"
  />
</template>

<script>
import BaseButton from '@/BaseButton.vue'
import DeleteModal from './RecommendationDeleteButton/DeleteModal.vue'

export default {
  name: 'RecommendationDeleteButton',
  components: {
    BaseButton,
    DeleteModal
  },
  props: {
    recommendationData: Object
  },
  emits: [
    'deleted'
  ],
  computed: {
    textFormatted () {
      return this.$t(
        'shared.buttons.delete'
      )
    }
  },
  methods: {
    handleClick () {
      this.$refs.modal.show()
    },
    handleDeleted () {
      this.$emit('deleted')
    }
  }
}
</script>

<style lang="sass" scoped>
.delete-button
  @extend .no-margin
  margin-top: 1em !important
</style>
