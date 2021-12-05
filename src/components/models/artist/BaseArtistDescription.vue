<template>
  <BaseDescription
    :description="description"
    :isMore="isMore"
    @moreClick="handleMoreClick"
  />

  <BaseArtistDescriptionModal
    v-if="isMore"
    ref="modal"
    :artistName="artistName"
  />
</template>

<script>
import BaseDescription from '@/BaseDescription.vue'
import BaseArtistDescriptionModal
  from '@/modals/artist/BaseArtistDescriptionModal.vue'

export default {
  name: 'BaseArtistDescription',
  components: {
    BaseDescription,
    BaseArtistDescriptionModal
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
