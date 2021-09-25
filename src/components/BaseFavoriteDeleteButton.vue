<template>
  <BaseLinkContainer :link="{}">
    <BaseButton
      class="red basic compact small delete-button"
      icon="close"
      :text="textFormatted"
      @click="handleClick"
    />
  </BaseLinkContainer>

  <DeleteModal
    ref="modal"
    :model="model"
    :modelData="modelData"
    @deleted="handleDeleted"
  />
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseButton from '@/BaseButton.vue'
import DeleteModal from './BaseFavoriteDeleteButton/DeleteModal.vue'

export default {
  name: 'BaseFavoriteDeleteButton',
  components: {
    BaseLinkContainer,
    BaseButton,
    DeleteModal
  },
  props: {
    model: String,
    modelData: Object
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
  margin-left: 0.5em !important
</style>
