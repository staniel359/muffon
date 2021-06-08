<template>
  <BaseDescription
    :description="description"
    :isMore="isMore"
    @moreClick="handleMoreClick"
  />

  <ArtistDescriptionModal
    v-if="isMore"
    ref="modal"
    :artistName="artistName"
  />
</template>

<script>
import BaseDescription from '@/BaseDescription.vue'
import ArtistDescriptionModal
  from './BaseArtistDescription/ArtistDescriptionModal.vue'

export default {
  name: 'BaseArtistDescription',
  components: {
    BaseDescription,
    ArtistDescriptionModal
  },
  props: {
    description: String,
    isMore: Boolean,
    artistName: String
  },
  methods: {
    handleMoreClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
