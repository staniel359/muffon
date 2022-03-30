<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :class="{
      disabled: isLoading,
      active: isActive
    }"
    @click.prevent="handleClick"
  >
    <BaseImage
      class="rounded bordered"
      model="playlist"
      :image="imageData?.small"
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
      ></small>
    </div>

    <div
      v-if="isLoading"
      class="ui active mini inline loader"
    ></div>
    <i
      v-else-if="isSuccess"
      class="green check icon"
    ></i>
    <i
      v-else-if="isError"
      class="red close icon"
    ></i>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import { number as formatNumber } from '*/helpers/formatters'
import createPlaylistTrack from '*/helpers/actions/api/playlist/track/create'
import deletePlaylistTrack from '*/helpers/actions/api/playlist/track/delete'

export default {
  name: 'PlaylistItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    BaseHeader
  },
  inject: [
    'findPaginationItem'
  ],
  props: {
    playlistData: {
      type: Object,
      required: true
    },
    profileId: {
      type: String,
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
    isActive () {
      return !!this.playlistTrackId
    },
    createArgs () {
      return {
        playlistId: this.playlistId,
        trackTitle: this.trackTitle,
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        imageUrl: this.imageUrl
      }
    },
    paginationItem () {
      return this.findPaginationItem({
        uuid: this.uuid
      })
    },
    uuid () {
      return this.playlistData.uuid
    },
    deleteArgs () {
      return {
        playlistId: this.playlistId,
        playlistTrackId: this.playlistTrackId
      }
    }
  },
  mounted () {
    this.playlistTrackId =
      this.playlistData.playlist_track_id
  },
  methods: {
    handleClick () {
      if (this.playlistTrackId) {
        this.deleteData()
      } else {
        this.postData()
      }
    },
    handleSuccess (response) {
      this.isSuccess = true

      this.playlistTrackId =
        response.data.playlist_track_id

      this.paginationItem.tracks_count =
        response.data.playlist_tracks_count
    },
    createPlaylistTrack,
    deletePlaylistTrack,
    postData () {
      this.createPlaylistTrack(
        this.createArgs
      ).then(
        this.handleSuccess
      )
    },
    deleteData () {
      this.deletePlaylistTrack(
        this.deleteArgs
      ).then(
        this.handleSuccess
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
