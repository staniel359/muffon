<template>
  <BaseSegmentContainer>
    <BaseProfileLibraryAlbumTracksPlayButton
      :profile-id="profileId"
      :library-album-id="libraryAlbumId"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileLibraryAlbumTracksPlayButton
  from '@/components/buttons/play/profile/library/album/BaseProfileLibraryAlbumTracksPlayButton.vue'

export default {
  name: 'PlayButtonSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileLibraryAlbumTracksPlayButton
  },
  props: {
    profileId: Number,
    libraryAlbumId: Number
  }
}
</script>

<style lang="sass" scoped></style>
