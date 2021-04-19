<template>
  <BaseArtistModalContainer
    ref="modal"
    scope="description"
    :artistName="artistName"
  >
    <template #default="modalSlotProps">
      <BaseModalDescription :description="modalSlotProps.description" />
    </template>
  </BaseArtistModalContainer>
</template>

<script>
import BaseArtistModalContainer
  from '@/containers/artist/BaseArtistModalContainer.vue'
import BaseModalDescription from '@/BaseModalDescription.vue'

export default {
  name: 'ArtistDescriptionModal',
  components: {
    BaseArtistModalContainer,
    BaseModalDescription
  },
  props: {
    artistName: String
  },
  methods: {
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
