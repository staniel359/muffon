<template>
  <BaseSegmentContainer>
    <div class="main-self-container">
      <BaseSelfIcons
        :libraryId="libraryId"
        :favoriteId="favoriteId"
        :bookmarkId="bookmarkId"
        :listenedId="listenedId"
      />

      <BaseOptionsDropdown
        model="artist"
        :artistName="artistName"
        :libraryId="libraryId"
        :favoriteId="favoriteId"
        :bookmarkId="bookmarkId"
        :listenedId="listenedId"
        isWithLibraryOption
        isWithFavoriteOption
        isWithBookmarkOption
        isWithListenedOption
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'

export default {
  name: 'SelfSegment',
  components: {
    BaseSegmentContainer,
    BaseSelfIcons,
    BaseOptionsDropdown
  },
  props: {
    artistName: String,
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String
  }
}
</script>

<style lang="sass" scoped>
.main-self-container
  @extend .no-margin
</style>
