<template>
  <div class="main-self-container">
    <BaseSelfIcons
      class="self-icons"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      is-with-library-icon
      is-with-favorite-icon
      is-with-bookmark-icon
    />

    <BaseArtistOptionsDropdown
      class="options-dropdown"
      :artist-data="artistData"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      is-with-library-option
      is-with-favorite-option
      is-with-bookmark-option
      is-with-listened-option
      is-with-share-option
    />
  </div>
</template>

<script>
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseArtistOptionsDropdown
  from '@/components/dropdowns/artist/BaseArtistOptionsDropdown.vue'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'SelfSection',
  components: {
    BaseSelfIcons,
    BaseArtistOptionsDropdown
  },
  mixins: [
    selfMixin
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    modelData () {
      return this.artistData
    }
  }
}
</script>

<style lang="sass" scoped>
.self-icons
  @extend .text-align-center
  width: 50px

.options-dropdown
  @extend .visibility-visible
</style>
