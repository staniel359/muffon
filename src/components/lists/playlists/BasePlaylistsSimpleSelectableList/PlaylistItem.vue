<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :class="{
      disabled: isLoading,
      active: isActive
    }"
    @click="handleClick"
  >
    <BasePlaylistImage
      :image="imageData.small"
    />

    <div class="content">
      <BaseHeader
        class="link"
        tag="h4"
        :text="playlistTitle"
      />

      <div class="description">
        {{ tracksCountTextFormatted }}
      </div>
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
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BasePlaylistImage from '@/models/playlist/BasePlaylistImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import { number as formatNumber } from '#/formatters'
import postTrackData from '#/actions/api/profile/playlist/tracks/postData'
import deleteTrackData from '#/actions/api/profile/playlist/tracks/deleteData'

export default {
  name: 'PlaylistItem',
  components: {
    BaseLinkContainer,
    BasePlaylistImage,
    BaseHeader
  },
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
    isActive () {
      return !!this.playlistTrackId
    },
    trackParams () {
      return {
        playlistId: this.playlistId,
        trackTitle: this.trackTitle,
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        imageUrl: this.imageUrl
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
    postTrackData,
    deleteTrackData,
    postData () {
      this.postTrackData(
        this.trackParams
      )
    },
    deleteData () {
      this.deleteTrackData({
        playlistId: this.playlistId,
        playlistTrackId: this.playlistTrackId
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
