<template>
  <BaseSegmentContainer>
    <div class="info-container main-simple-list-item">
      <BasePlaylistImage
        class="playlist-image"
        :image="imageData.small"
      />

      <div class="content">
        <BaseHeader
          tag="h3"
          :text="playlistTitle"
        />

        <div>
          {{ tracksCountTextFormatted }}
        </div>

        <div class="description main-small-container">
          <small>
            {{ createdTextFormatted }}
          </small>
        </div>
      </div>

      <BaseOptionsDropdown
        :isWithEditOption="isWithEditOption"
        :isWithDeleteOption="isWithDeleteOption"
        @edit="handleEditOptionClick"
        @delete="handleDeleteOptionClick"
      />
    </div>
  </BaseSegmentContainer>

  <BasePlaylistEditModal
    ref="editModal"
    :playlistData="playlistData"
  />

  <BasePlaylistDeleteModal
    ref="deleteModal"
    :playlistId="playlistId"
    :playlistTitle="playlistTitle"
    :profileId="profileId"
  />
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BasePlaylistImage from '@/models/playlist/BasePlaylistImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseOptionsDropdown from '@/BaseOptionsDropdown.vue'
import BasePlaylistEditModal
  from '@/models/playlist/BasePlaylistEditModal.vue'
import BasePlaylistDeleteModal
  from '@/models/playlist/BasePlaylistDeleteModal.vue'
import {
  number as formatNumber,
  date as formatDate
} from '#/formatters'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BasePlaylistImage,
    BaseHeader,
    BaseOptionsDropdown,
    BasePlaylistEditModal,
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
    tracksCountTextFormatted () {
      return this.$t(
        'shared.tracks',
        { count: this.tracksCountFormatted }
      )
    },
    tracksCountFormatted () {
      return formatNumber(
        this.tracksCount
      )
    },
    tracksCount () {
      return this.playlistData.tracks_count
    },
    createdTextFormatted () {
      return this.$t(
        'shared.playlist.created',
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

.main-options-dropdown
  visibility: visible
</style>
