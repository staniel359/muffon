<template>
  <BaseSegmentContainer>
    <div class="main-self-container">
      <BaseSelfIcons
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
      />

      <BaseArtistOptionsDropdown
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
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseArtistOptionsDropdown
  from '*/components/dropdowns/artist/BaseArtistOptionsDropdown.vue'
import selfMixin from '*/mixins/selfMixin'

export default {
  name: 'SelfSegment',
  components: {
    BaseSegmentContainer,
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
.main-self-container
  @extend .no-margin
</style>
