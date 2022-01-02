<template>
  <template v-if="description">
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
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
