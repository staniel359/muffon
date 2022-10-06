<template>
  <BaseDescriptionSection
    :description="description"
    :is-more="isRenderMore"
    :is-small="isSmall"
    @more-click="handleMoreClick"
  />

  <BaseArtistDescriptionModal
    v-if="isRenderMore"
    ref="modal"
    :artist-name="artistName"
  />
</template>

<script>
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'
import BaseArtistDescriptionModal
  from '@/components/modals/artist/BaseArtistDescriptionModal.vue'

export default {
  name: 'BaseArtistDescription',
  components: {
    BaseDescriptionSection,
    BaseArtistDescriptionModal
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isWithMore: {
      type: Boolean,
      default: true
    },
    isSmall: Boolean
  },
  computed: {
    description () {
      return this.artistData.description
    },
    isRenderMore () {
      return (
        this.isMore &&
          this.isWithMore
      )
    },
    isMore () {
      return this.artistData.with_more?.description
    },
    artistName () {
      return this.artistData.name
    }
  },
  methods: {
    handleMoreClick () {
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
