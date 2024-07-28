<template>
  <div class="main-self-container main-bottom-medium-section">
    <BaseSelfIcons
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
    />

    <BaseArtistOptionsPopup
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
      is-with-external-link-option
    />
  </div>
</template>

<script>
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseArtistOptionsPopup
  from '@/components/popups/artist/BaseArtistOptionsPopup.vue'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'SelfSection',
  components: {
    BaseSelfIcons,
    BaseArtistOptionsPopup
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

<style lang="sass" scoped></style>
