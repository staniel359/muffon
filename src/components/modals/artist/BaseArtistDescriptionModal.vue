<template>
  <BaseArtistModalContainer
    ref="modal"
    scope="description"
    :artistName="artistName"
  >
    <template #default="slotProps">
      <BaseDescription
        :description="slotProps.description"
        isModal
      />
    </template>
  </BaseArtistModalContainer>
</template>

<script>
import BaseArtistModalContainer
  from '@/containers/modals/artist/BaseArtistModalContainer.vue'
import BaseDescription from '@/BaseDescription.vue'

export default {
  name: 'BaseArtistDescriptionModal',
  components: {
    BaseArtistModalContainer,
    BaseDescription
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
