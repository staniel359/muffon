<template>
  <BaseAlbumModalContainer
    ref="modal"
    scope="description"
    :requestAlbumData="requestAlbumData"
  >
    <template #default="slotProps">
      <BaseModalDescription
        :description="slotProps.description"
      />
    </template>
  </BaseAlbumModalContainer>
</template>

<script>
import BaseAlbumModalContainer
  from '@/containers/album/BaseAlbumModalContainer.vue'
import BaseModalDescription from '@/BaseModalDescription.vue'

export default {
  name: 'AlbumDescriptionModal',
  components: {
    BaseAlbumModalContainer,
    BaseModalDescription
  },
  props: {
    requestAlbumData: Object
  },
  methods: {
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
