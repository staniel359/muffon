<template>
  <BaseSegmentContainer>
    <BaseProfileLibraryArtistTracksPlayButton
      :profile-id="profileId"
      :library-artist-id="libraryArtistId"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileLibraryArtistTracksPlayButton
  from '@/components/buttons/play/profile/library/artist/BaseProfileLibraryArtistTracksPlayButton.vue'

export default {
  name: 'PlayButtonSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileLibraryArtistTracksPlayButton
  },
  props: {
    profileId: String,
    libraryArtistId: String
  }
}
</script>

<style lang="sass" scoped></style>
