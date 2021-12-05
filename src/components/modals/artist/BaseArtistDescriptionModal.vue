<template>
  <BaseArtistModalContainer
    ref="modal"
    scope="description"
    :artistName="artistName"
  >
    <template #default="slotProps">
      <BaseModalDescription
        :description="slotProps.description"
      />
    </template>
  </BaseArtistModalContainer>
</template>

<script>
import BaseArtistModalContainer
  from '@/containers/artist/BaseArtistModalContainer.vue'
import BaseModalDescription from '@/BaseModalDescription.vue'

export default {
  name: 'BaseArtistDescriptionModal',
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
