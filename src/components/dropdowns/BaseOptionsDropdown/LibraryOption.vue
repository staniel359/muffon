<template>
  <Component
    class="ui item"
    :is="component"
    :class="{ disabled: isLoading }"
    :link="linkFormatted"
    @click="handleClick"
  >
    <i
      v-if="isLoading"
      class="icon"
    >
      <div class="ui mini active inline loader"></div>
    </i>
    <i
      v-else
      class="headphones icon"
    ></i>

    {{ textFormatted }}
  </Component>
</template>

<script>
import { mapState } from 'vuex'
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import postArtistData from '#/actions/api/profile/library/artists/postData'
import postAlbumData from '#/actions/api/profile/library/albums/postData'
import postTrackData from '#/actions/api/profile/library/tracks/postData'
import {
  main as formatProfileLibraryArtistMainLink
} from '#/formatters/links/profile/library/artist'
import {
  main as formatProfileLibraryAlbumMainLink
} from '#/formatters/links/profile/library/album'
import {
  main as formatProfileLibraryTrackMainLink
} from '#/formatters/links/profile/library/track'

export default {
  name: 'FavoriteOption',
  components: {
    BaseLinkContainer
  },
  inject: [
    'setLibraryId'
  ],
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
  emits: [
    'linkClick'
  ],
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    textFormatted () {
      if (this.modelId) {
        return this.$t(
          'shared.library.show'
        )
      } else {
        return this.$t(
          'shared.library.add'
        )
      }
    },
    linkFormatted () {
      switch (this.model) {
        case 'artist':
          return formatProfileLibraryArtistMainLink({
            profileId: this.profileId,
            artistId: this.modelId
          })
        case 'album':
          return formatProfileLibraryAlbumMainLink({
            profileId: this.profileId,
            albumId: this.modelId
          })
        case 'track':
          return formatProfileLibraryTrackMainLink({
            profileId: this.profileId,
            trackId: this.modelId
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
    },
    component () {
      if (this.modelId) {
        return 'BaseLinkContainer'
      } else {
        return 'div'
      }
    },
    artistParams () {
      return {
        artistName: this.artistName
      }
    },
    albumParams () {
      return {
        albumTitle: this.albumTitle,
        artistName: this.artistName,
        albumTracks: this.albumTracksFormatted,
        imageUrl: this.imageUrl
      }
    },
    trackParams () {
      return {
        trackTitle: this.trackTitle,
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        imageUrl: this.imageUrl
      }
    }
  },
  methods: {
    handleClick (event) {
      if (this.modelId) {
        this.$emit('linkClick')
      } else {
        event.preventDefault()

        const handleSuccess = response => {
          const libraryId =
            response.data.library_id.toString()

          this.setLibraryId(
            libraryId
          )
        }

        this.addToLibrary()
          .then(handleSuccess)
      }
    },
    postArtistData,
    postAlbumData,
    postTrackData,
    addToLibrary () {
      switch (this.model) {
        case 'artist':
          return this.postArtistData(
            this.artistParams
          )
        case 'album':
          return this.postAlbumData(
            this.albumParams
          )
        case 'track':
          return this.postTrackData(
            this.trackParams
          )
        default:
          return null
      }
    },
    formatAlbumTrack (trackData) {
      return {
        title: trackData.title,
        artist: {
          name: trackData.artist.name
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
