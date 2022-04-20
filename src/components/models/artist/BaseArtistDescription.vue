<template>
  <template v-if="description">
    <BaseDescription
      :description="description"
      :is-more="isMore"
      @more-click="handleMoreClick"
    />

    <BaseArtistDescriptionModal
      v-if="isMore"
      ref="modal"
      :artist-name="artistName"
    />
  </template>
</template>

<script>
import BaseDescription from '*/components/BaseDescription.vue'
import BaseArtistDescriptionModal
  from '*/components/modals/artist/BaseArtistDescriptionModal.vue'

export default {
  name: 'BaseArtistDescription',
  components: {
    BaseDescription,
    BaseArtistDescriptionModal
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    description () {
      return this.artistData.description
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
