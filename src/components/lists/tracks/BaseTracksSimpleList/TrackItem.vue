<template>
  <BaseTrackContainer
    ref="container"
    class="item main-simple-list-item"
    :trackData="trackData"
    :queueTracks="queueTracks"
    :isDisabled="isDeleted"
    isWithActiveClass
  >
    <template #default="slotProps">
      <BaseTrackContent
        :trackData="trackData"
        :isLoading="slotProps.isLoading"
        :isError="slotProps.isError"
        :isCurrent="slotProps.isCurrent"
        :isWithImage="isWithImage"
        :isWithIndex="isWithIndex"
        :index="index"
        :isWithArtistName="isWithArtistName"
        :albumArtistName="albumArtistName"
        :isWithAlbumTitle="isWithAlbumTitle"
        :isWithListenersCount="isWithListenersCount"
        :topTrackCount="topTrackCount"
        :isWithDuration="isWithDuration"
        :isWithSource="isWithSource"
        :isLinkToLibrary="isLinkToLibrary"
        :profileId="profileId"
        :isWithLibraryOption="isWithLibraryOption"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithBookmarkOption="isWithBookmarkOption"
        :isWithListenedOption="isWithListenedOption"
        :isWithPlaylistOption="isWithPlaylistOption"
        :isWithDeleteOption="isWithDeleteOption"
        :isClearable="isClearable"
        :isWithCreated="isWithCreated"
        :isWithSelfIcons="isWithSelfIcons"
        :isBookmark="isBookmark"
        :isFavorite="isFavorite"
        :isPlaylistTrack="isPlaylistTrack"
        :playlistId="playlistId"
        :playlistTitle="playlistTitle"
        :isDeleted="isDeleted"
        @linkClick="handleLinkClick"
        @deleteButtonClick="handleDeleteButtonClick"
        @deleted="handleDeleted"
      />
    </template>
  </BaseTrackContainer>
</template>

<script>
import BaseTrackContainer from '@/containers/track/BaseTrackContainer.vue'
import BaseTrackContent from '@/models/track/BaseTrackContent.vue'

export default {
  name: 'TrackItem',
  components: {
    BaseTrackContainer,
    BaseTrackContent
  },
  props: {
    trackData: Object,
    queueTracks: Array,
    isWithImage: Boolean,
    imageData: Object,
    isWithIndex: Boolean,
    index: Number,
    albumArtistName: String,
    isWithArtistName: Boolean,
    isWithAlbumTitle: Boolean,
    isWithListenersCount: Boolean,
    topTrackCount: Number,
    isWithDuration: Boolean,
    isWithSource: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    artistId: String,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithPlaylistOption: Boolean,
    isWithDeleteOption: Boolean,
    isClearable: Boolean,
    isWithCreated: Boolean,
    isWithSelfIcons: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    isPlaylistTrack: Boolean,
    playlistId: String,
    playlistTitle: String
  },
  emits: [
    'linkClick',
    'deleteButtonClick'
  ],
  data () {
    return {
      isDeleted: false
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleDeleteButtonClick ({ uuid }) {
      this.$emit(
        'deleteButtonClick',
        { uuid }
      )
    },
    handleDeleted () {
      this.isDeleted = true
    },
    fetchAudio () {
      this.$refs.container.fetchAudio()
    }
  }
}
</script>

<style lang="sass" scoped></style>
