<template>
  <BaseButton
    class="red fluid"
    icon="close"
    :text="textFormatted"
    @click="handleClick"
  />

  <DeleteModal
    ref="modal"
    :profileId="profileId"
    :model="model"
    :modelId="modelId"
    :modelFullTitle="modelFullTitle"
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
    modelFullTitle: String
  },
  computed: {
    textFormatted () {
      return localize(
        'shared.library.delete.header'
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

<style lang="sass" scoped></style>
