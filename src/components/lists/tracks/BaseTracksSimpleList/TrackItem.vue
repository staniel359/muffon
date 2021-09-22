<template>
  <BaseTrackContainer
    class="item main-simple-list-item"
    :trackData="trackData"
    :queueTracks="queueTracks"
    :isDisabled="isDisabled"
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
        :isWithLibraryLink="isWithLibraryLink"
        :isWithListenedButton="isWithListenedButton"
        :isWithBookmarkButton="isWithBookmarkButton"
        :isWithClearButton="isWithClearButton"
        :isWithCreated="isWithCreated"
        :isWithSelfButtons="isWithSelfButtons"
        :isBookmark="isBookmark"
        :isBookmarkDeleted="isBookmarkDeleted"
        @linkClick="handleLinkClick"
        @deleteButtonClick="handleDeleteButtonClick"
        @bookmarkDeleted="handleBookmarkDeleted"
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
    isWithLibraryLink: Boolean,
    isWithListenedButton: Boolean,
    isWithBookmarkButton: Boolean,
    isWithClearButton: Boolean,
    isWithCreated: Boolean,
    isWithSelfButtons: Boolean,
    isBookmark: Boolean
  },
  emits: [
    'linkClick',
    'deleteButtonClick'
  ],
  data () {
    return {
      isBookmarkDeleted: false
    }
  },
  computed: {
    isDisabled () {
      return this.isBookmarkDeleted
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
    handleBookmarkDeleted () {
      this.isBookmarkDeleted = true
    }
  }
}
</script>

<style lang="sass" scoped></style>
