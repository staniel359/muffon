<template>
  <div>
    <BaseLinkContainer
      v-if="libraryId"
      :link="linkFormatted"
    >
      <BaseButton
        class="green fluid"
        icon="headphones"
        :text="showFormatted"
      />
    </BaseLinkContainer>
    <BaseButton
      v-else
      class="primary fluid"
      icon="headphones"
      :class="{
        loading: isLoading,
        disabled: isLoading
      }"
      :text="addFormatted"
      @click="handleAddButtonClick"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseButton from '@/BaseButton.vue'
import {
  main as formatProfileLibraryArtistMainLink
} from '#/formatters/links/profile/library/artist'
import {
  main as formatProfileLibraryAlbumMainLink
} from '#/formatters/links/profile/library/album'
import {
  main as formatProfileLibraryTrackMainLink
} from '#/formatters/links/profile/library/track'
import postArtistData from '#/actions/api/profile/library/artists/postData'
import postAlbumData from '#/actions/api/profile/library/albums/postData'
import postTrackData from '#/actions/api/profile/library/tracks/postData'

export default {
  name: 'BaseLibraryButton',
  components: {
    BaseLinkContainer,
    BaseButton
  },
  props: {
    model: {
      type: String,
      required: true
    },
    albumTracks: {
      type: Array,
      default () {
        return []
      }
    },
    modelId: String,
    artistName: String,
    albumTitle: String,
    trackTitle: String,
    imageUrl: String
  },
  data () {
    return {
      libraryId: null,
      isError: false,
      isLoading: false
    }
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    showFormatted () {
      return this.$t(
        'shared.library.show'
      )
    },
    addFormatted () {
      return this.$t(
        'shared.library.add'
      )
    },
    linkFormatted () {
      switch (this.model) {
        case 'artist':
          return formatProfileLibraryArtistMainLink({
            profileId: this.profileId,
            artistId: this.libraryId
          })
        case 'album':
          return formatProfileLibraryAlbumMainLink({
            profileId: this.profileId,
            albumId: this.libraryId
          })
        case 'track':
          return formatProfileLibraryTrackMainLink({
            profileId: this.profileId,
            trackId: this.libraryId
          })
        default:
          return {}
      }
    },
    profileId () {
      return this.profileInfo.id.toString()
    },
    albumTracksFormatted () {
      return this.albumTracks.map(
        this.formatAlbumTrack
      )
    }
  },
  mounted () {
    this.libraryId = this.modelId
  },
  methods: {
    handleAddButtonClick () {
      switch (this.model) {
        case 'artist':
          return this.postArtistData({
            artistName: this.artistName
          })
        case 'album':
          return this.postAlbumData({
            title: this.albumTitle,
            artistName: this.artistName,
            tracks: this.albumTracksFormatted,
            imageUrl: this.imageUrl
          })
        case 'track':
          return this.postTrackData({
            title: this.trackTitle,
            artistName: this.artistName,
            albumTitle: this.albumTitle,
            imageUrl: this.imageUrl
          })
        default:
          return null
      }
    },
    postArtistData,
    postAlbumData,
    postTrackData,
    formatAlbumTrack (trackData) {
      return {
        title: trackData.title,
        artist: trackData.artist.name
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
