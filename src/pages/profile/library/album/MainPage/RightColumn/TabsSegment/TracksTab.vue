<template>
  <BaseProfileLibraryAlbumTabContainer
    :profile-id="profileId"
    :library-album-id="libraryAlbumId"
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
      <BaseProfileLibraryAlbumTracksPlayButton
        :profile-id="profileId"
        :library-album-id="libraryAlbumId"
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
  </BaseProfileLibraryAlbumTabContainer>
</template>

<script>
import BaseProfileLibraryAlbumTabContainer
  from '@/components/containers/tabs/profile/library/album/BaseProfileLibraryAlbumTabContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseProfileLibraryAlbumTracksPlayButton
  from '@/components/buttons/play/profile/library/album/BaseProfileLibraryAlbumTracksPlayButton.vue'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'TracksTab',
  components: {
    BaseProfileLibraryAlbumTabContainer,
    BaseTracksSimpleList,
    BaseProfileLibraryAlbumTracksPlayButton
  },
  mixins: [
    tabMixin
  ],
  props: {
    profileId: Number,
    libraryAlbumId: Number,
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
