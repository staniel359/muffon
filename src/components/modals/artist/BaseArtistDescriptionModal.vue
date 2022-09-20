<template>
  <BaseArtistModalContainer
    ref="modal"
    :artist-name="artistName"
    :scope="scope"
  >
    <template #default="slotProps">
      <BaseDescription
        :description="slotProps[scope]"
        is-modal
      />
    </template>
  </BaseArtistModalContainer>
</template>

<script>
import BaseArtistModalContainer
  from '@/components/containers/modals/artist/BaseArtistModalContainer.vue'
import BaseDescription from '@/components/BaseDescription.vue'

export default {
  name: 'BaseArtistDescriptionModal',
  components: {
    BaseArtistModalContainer,
    BaseDescription
  },
  props: {
    artistName: String
  },
  data () {
    return {
      scope: 'description'
    }
  },
  methods: {
    show () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
