<template>
  <BaseSegmentContainer
    class="main-profile-page-info"
  >
    <div class="main-self-container">
      <BaseSelfIcons
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
        :is-with-library-icon="!isSelf"
      />

      <BaseTrackOptionsDropdown
        :track-data="trackData"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
        :is-with-library-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-playlist-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-queue-option
        is-with-share-option
        @playlist-option-click="handlePlaylistOptionClick"
        @delete-option-click="handleDeleteOptionClick"
      />

      <BasePlaylistsModal
        ref="playlistsModal"
        :track-data="trackData"
      />

      <BaseLibraryDeleteModal
        v-if="isSelf"
        ref="deleteModal"
        model="track"
        :profile-id="profileId"
        :model-id="libraryTrackId"
        :model-name="trackFullTitle"
        is-delete-with-redirect
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseTrackOptionsDropdown
  from '*/components/dropdowns/track/BaseTrackOptionsDropdown.vue'
import BasePlaylistsModal
  from '*/components/modals/playlists/BasePlaylistsModal.vue'
import BaseLibraryDeleteModal
  from '*/components/modals/library/BaseLibraryDeleteModal.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'
import selfMixin from '*/mixins/selfMixin'

export default {
  name: 'SelfSegment',
  components: {
    BaseSegmentContainer,
    BaseSelfIcons,
    BaseTrackOptionsDropdown,
    BasePlaylistsModal,
    BaseLibraryDeleteModal
  },
  mixins: [
    selfMixin
  ],
  props: {
    trackData: {
      type: Object,
      required: true
    },
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    modelData () {
      return this.trackData
    },
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    },
    libraryTrackId () {
      return this.trackData.library.id.toString()
    },
    trackFullTitle () {
      return [
        this.artistName,
        this.trackTitle
      ].join(
        ' - '
      )
    },
    trackTitle () {
      return this.trackData.title
    },
    artistName () {
      return this.trackData.artist.name
    }
  },
  methods: {
    handleDeleteOptionClick () {
      this.showDeleteModal()
    },
    handlePlaylistOptionClick () {
      this.showPlaylistsModal()
    },
    showDeleteModal () {
      this.$refs
        .deleteModal
        .show()
    },
    showPlaylistsModal () {
      this.$refs
        .playlistsModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
