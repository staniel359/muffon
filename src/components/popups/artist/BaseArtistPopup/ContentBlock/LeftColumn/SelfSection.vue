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

    <BaseArtistOptionsPopup
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
      is-with-external-link-option
      @menu-active-change="handleOptionsActiveChange"
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
  inject: [
    'setIsOptionsActive'
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
  },
  methods: {
    handleOptionsActiveChange (
      value
    ) {
      this.setIsOptionsActive(
        value
      )
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
