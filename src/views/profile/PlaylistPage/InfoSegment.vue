<template>
  <BaseSegmentContainer>
    <BaseListContainer>
      <div class="item main-simple-list-item">
        <div class="playlist-image-container">
          <BaseZoomableImage
            model="playlist"
            size="small"
            :image-data="imageData"
          />
        </div>

        <div class="content">
          <div class="title-container">
            <BaseHeader
              tag="h3"
              :text="playlistTitle"
            />

            <BasePrivateIcon
              v-if="isPrivate"
            />
          </div>

          <div
            class="description"
            v-html="tracksCountText"
          />

          <BaseTimestampSection
            class="description"
            :created="created"
            is-only-date
          />
        </div>

        <BasePlaylistOptionsDropdown
          class="playlist-options"
          :playlist-data="playlistData"
          :share-data="shareData"
          :is-with-edit-option="isSelf"
          :is-with-delete-option="isSelf"
          is-with-share-option
          is-delete-with-redirect
        />
      </div>
    </BaseListContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import BaseZoomableImage from '@/components/images/BaseZoomableImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BasePrivateIcon from '@/components/icons/BasePrivateIcon.vue'
import BaseTimestampSection
  from '@/components/sections/BaseTimestampSection.vue'
import BasePlaylistOptionsDropdown
  from '@/components/dropdowns/playlist/BasePlaylistOptionsDropdown.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'
import {
  isCurrentProfile
} from '@/helpers/utils'
import {
  playlist as formatPlaylistShareData
} from '@/helpers/formatters/share'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseListContainer,
    BaseZoomableImage,
    BaseHeader,
    BasePrivateIcon,
    BaseTimestampSection,
    BasePlaylistOptionsDropdown
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
    },
    shareData () {
      return formatPlaylistShareData(
        this.playlistData
      )
    },
    isPrivate () {
      return this.playlistData.private
    }
  }
}
</script>

<style lang="sass" scoped>
.playlist-image-container
  width: 60px
  height: 60px

.content
  margin-left: 0.75em

.title-container
  @extend .d-flex, .align-items-center

.playlist-options
  @extend .visibility-visible
</style>
