<template>
  <BaseProfileLibraryArtistTabContainer
    :profile-id="profileId"
    :library-artist-id="libraryArtistId"
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    is-with-top-section
    is-with-play-button
    @focus="handleFocus"
  >
    <template
      #topPlayButton
    >
      <BaseProfileLibraryArtistTracksPlayButton
        :profile-id="profileId"
        :library-artist-id="libraryArtistId"
      />
    </template>

    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :profile-id="profileId"
        :is-with-library-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-image
        is-with-album-title
        is-with-source
        is-with-created
        is-link-to-library
        is-with-page-option
        is-with-source-option
        is-with-playlist-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-queue-option
        is-with-save-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseProfileLibraryArtistTabContainer>
</template>

<script>
import BaseProfileLibraryArtistTabContainer
  from '@/components/containers/tabs/profile/library/artist/BaseProfileLibraryArtistTabContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseProfileLibraryArtistTracksPlayButton
  from '@/components/buttons/play/profile/library/artist/BaseProfileLibraryArtistTracksPlayButton.vue'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'TracksTab',
  components: {
    BaseProfileLibraryArtistTabContainer,
    BaseTracksSimpleList,
    BaseProfileLibraryArtistTracksPlayButton
  },
  mixins: [
    tabMixin
  ],
  props: {
    profileId: Number,
    libraryArtistId: Number,
    isSelf: Boolean
  },
  data () {
    return {
      limit:
        tracksLimits.simple.small,
      scope: 'tracks'
    }
  }
}
</script>

<style lang="sass" scoped></style>
