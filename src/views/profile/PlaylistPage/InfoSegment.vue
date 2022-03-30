<template>
  <BaseSegmentContainer>
    <div class="info-container main-simple-list-item">
      <BaseImage
        class="playlist-image rounded bordered"
        model="playlist"
        :image="imageData?.small"
      />

      <div class="content">
        <BaseHeader
          tag="h3"
          :text="playlistTitle"
        />

        <div
          v-html="tracksCountText"
        ></div>

        <div class="description main-small-container">
          <small>
            {{ createdText }}
          </small>
        </div>
      </div>

      <BaseOptionsDropdown
        class="playlist-options"
        :isWithEditOption="isWithEditOption"
        :isWithDeleteOption="isWithDeleteOption"
        @edit="handleEditOptionClick"
        @delete="handleDeleteOptionClick"
      />
    </div>
  </BaseSegmentContainer>

  <BasePlaylistUpdateModal
    ref="editModal"
    :playlistData="playlistData"
  />

  <BasePlaylistDeleteModal
    ref="deleteModal"
    :playlistId="playlistId"
    :playlistTitle="playlistTitle"
    :profileId="profileId"
    isDeleteWithRedirect
  />
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BasePlaylistUpdateModal
  from '*/components/modals/playlist/BasePlaylistUpdateModal.vue'
import BasePlaylistDeleteModal
  from '*/components/modals/playlist/BasePlaylistDeleteModal.vue'
import {
  number as formatNumber,
  date as formatDate
} from '*/helpers/formatters'
import { isCurrentProfile } from '*/helpers/utils'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseImage,
    BaseHeader,
    BaseOptionsDropdown,
    BasePlaylistUpdateModal,
    BasePlaylistDeleteModal
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    },
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    playlistId () {
      return this.playlistData.id.toString()
    },
    imageData () {
      return this.playlistData.image
    },
    playlistTitle () {
      return this.playlistData.title
    },
    tracksCountText () {
      return this.$t(
        'counters.tracks',
        { count: this.tracksCountStrong }
      )
    },
    tracksCountStrong () {
      return `<strong>${this.tracksCountFormatted}</strong>`
    },
    tracksCountFormatted () {
      return formatNumber(
        this.tracksCount
      )
    },
    tracksCount () {
      return this.playlistData.tracks_count
    },
    createdText () {
      return this.$t(
        'playlist.created',
        { date: this.createdDateFormatted }
      )
    },
    createdDateFormatted () {
      return formatDate(
        this.playlistData.created
      )
    },
    isWithEditOption () {
      return isCurrentProfile(
        this.profileId
      )
    },
    isWithDeleteOption () {
      return isCurrentProfile(
        this.profileId
      )
    }
  },
  methods: {
    handleEditOptionClick () {
      this.$refs.editModal.show()
    },
    handleDeleteOptionClick () {
      this.$refs.deleteModal.show()
    }
  }
}
</script>

<style lang="sass" scoped>
.playlist-image
  width: 60px
  height: 60px

.playlist-options
  @extend .visibility-visible
</style>
