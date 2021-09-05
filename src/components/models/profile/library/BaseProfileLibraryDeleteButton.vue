<template>
  <div class="delete-button-container">
    <BaseButton
      class="red basic compact small"
      icon="close"
      :text="textFormatted"
      @click="handleClick"
    />
  </div>

  <DeleteModal
    ref="modal"
    :profileId="profileId"
    :model="model"
    :modelId="modelId"
    :modelTitle="modelTitle"
  />
</template>

<script>
import BaseButton from '@/BaseButton.vue'
import DeleteModal from './BaseProfileLibraryDeleteButton/DeleteModal.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'BaseProfileLibraryDeleteButton',
  components: {
    BaseButton,
    DeleteModal
  },
  props: {
    profileId: String,
    model: String,
    modelId: String,
    modelTitle: String
  },
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
    }
  }
}
</script>

<style lang="sass" scoped>
.delete-button-container
  @extend .d-flex, .justify-content-center
</style>
