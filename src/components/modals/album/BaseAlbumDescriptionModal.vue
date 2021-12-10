<template>
  <BaseAlbumModalContainer
    ref="modal"
    scope="description"
    :requestAlbumData="requestAlbumData"
  >
    <template #default="slotProps">
      <BaseDescription
        :description="slotProps.description"
        isModal
      />
    </template>
  </BaseAlbumModalContainer>
</template>

<script>
import BaseAlbumModalContainer
  from '@/containers/modals/album/BaseAlbumModalContainer.vue'
import BaseDescription from '@/BaseDescription.vue'

export default {
  name: 'BaseAlbumDescriptionModal',
  components: {
    BaseAlbumModalContainer,
    BaseDescription
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
