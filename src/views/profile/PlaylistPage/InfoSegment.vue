<template>
  <BaseSegmentContainer>
    <BaseListContainer>
      <div
        :class="[
          'item main-simple-list-item',
          'main-playlist-info-item'
        ]"
      >
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
            class="description"
            v-html="tracksCountText"
          />

          <BaseTimestamp
            class="description playlist-timestamp"
            :created="created"
          />
        </div>

        <BaseOptionsDropdown
          class="playlist-options"
          :is-with-edit-option="isSelf"
          :is-with-delete-option="isSelf"
          @edit-option-click="handleEditOptionClick"
          @delete-option-click="handleDeleteOptionClick"
        />
      </div>
    </BaseListContainer>
  </BaseSegmentContainer>

  <BasePlaylistUpdateModal
    ref="editModal"
    :playlist-data="playlistData"
  />

  <BasePlaylistDeleteModal
    ref="deleteModal"
    :playlist-data="playlistData"
    is-delete-with-redirect
  />
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseTimestamp from '*/components/BaseTimestamp.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BasePlaylistUpdateModal
  from '*/components/modals/playlist/BasePlaylistUpdateModal.vue'
import BasePlaylistDeleteModal
  from '*/components/modals/playlist/BasePlaylistDeleteModal.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'
import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseListContainer,
    BaseImage,
    BaseHeader,
    BaseTimestamp,
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
    imageData () {
      return this.playlistData.image
    },
    playlistTitle () {
      return this.playlistData.title
    },
    tracksCountText () {
      return this.$tc(
        'counters.nominative.tracks',
        this.tracksCount,
        {
          count: this.tracksCountStrong
        }
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
    created () {
      return this.playlistData.created
    },
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  },
  methods: {
    handleEditOptionClick () {
      this.showEditModal()
    },
    handleDeleteOptionClick () {
      this.showDeleteModal()
    },
    showEditModal () {
      this.$refs
        .editModal
        .show()
    },
    showDeleteModal () {
      this.$refs
        .deleteModal
        .show()
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
