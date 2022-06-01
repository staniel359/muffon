<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :class="{
      disabled: isLoading,
      active: isActive
    }"
    @click="handleClick"
  >
    <BaseImage
      class="rounded bordered"
      model="playlist"
      :image="imageData?.extrasmall"
    />

    <div class="content">
      <BaseHeader
        class="link"
        tag="h4"
        :text="playlistTitle"
      />

      <small
        class="description"
        v-html="tracksCountText"
      />
    </div>

    <div class="icon-container">
      <BaseIcon
        :is-loading="isLoading"
        :icon="icon"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseIcon from '*/components/BaseIcon.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'
import createPlaylistTrack from '*/helpers/actions/api/playlist/track/create'
import deletePlaylistTrack from '*/helpers/actions/api/playlist/track/delete'

export default {
  name: 'PlaylistItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    BaseHeader,
    BaseIcon
  },
  inject: {
    findPaginationItem: {
      default: () => false
    }
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    },
    trackTitle: {
      type: String,
      required: true
    },
    artistName: {
      type: String,
      required: true
    },
    albumTitle: String,
    imageUrl: String
  },
  data () {
    return {
      playlistTrackId: null,
      isLoading: false,
      isSuccess: false,
      isError: false
    }
  },
  computed: {
    playlistId () {
      return this.playlistData.id
    },
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
    isActive () {
      return !!this.playlistTrackId
    },
    createArgs () {
      return {
        playlistId: this.playlistId,
        trackTitle: this.trackTitle,
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        imageUrl: this.imageUrl,
        isSelectable: true
      }
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.playlistData.uuid
    },
    deleteArgs () {
      return {
        playlistId: this.playlistId,
        playlistTrackId: this.playlistTrackId,
        isSelectable: true
      }
    },
    icon () {
      if (this.isSuccess) {
        return 'green check'
      } else if (this.isError) {
        return 'red close'
      } else {
        return null
      }
    }
  },
  mounted () {
    this.playlistTrackId =
      this.playlistData.playlist_track_id
  },
  methods: {
    createPlaylistTrack,
    deletePlaylistTrack,
    handleClick () {
      if (this.playlistTrackId) {
        this.deleteData()
      } else {
        this.postData()
      }
    },
    postData () {
      this.createPlaylistTrack(
        this.createArgs
      )
    },
    deleteData () {
      this.deletePlaylistTrack(
        this.deleteArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.icon-container
  @extend .d-flex, .align-items-center, .justify-content-center
  width: 20px
  height: 20px
  &.icon
    @extend .no-padding
</style>
