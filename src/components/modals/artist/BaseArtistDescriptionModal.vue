<template>
  <BaseArtistModalContainer
    ref="modal"
    :artist-name="artistName"
    :scope="scope"
  >
    <template #default="slotProps">
      <BaseDescriptionSection
        :description="slotProps[scope]"
        is-modal
      />
    </template>
  </BaseArtistModalContainer>
</template>

<script>
import BaseArtistModalContainer
  from '@/components/containers/modals/artist/BaseArtistModalContainer.vue'
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'

export default {
  name: 'BaseArtistDescriptionModal',
  components: {
    BaseArtistModalContainer,
    BaseDescriptionSection
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
