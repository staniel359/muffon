<template>
  <BaseButton
    class="red basic compact small delete-button"
    icon="close"
    :text="textFormatted"
    @click="handleClick"
  />

  <RecommendationDeleteModal
    ref="modal"
    :recommendationData="recommendationData"
    @deleted="handleDeleted"
  />
</template>

<script>
import BaseButton from '@/BaseButton.vue'
import RecommendationDeleteModal
  from './RecommendationDeleteButton/RecommendationDeleteModal.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'RecommendationDeleteButton',
  components: {
    BaseButton,
    RecommendationDeleteModal
  },
  props: {
    recommendationData: Object
  },
  emits: [
    'deleted'
  ],
  computed: {
    textFormatted () {
      return localize(
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
