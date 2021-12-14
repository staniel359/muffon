<template>
  <Component
    class="ui item"
    :is="component"
    :class="{ disabled: isLoading }"
    :link="link"
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

    {{ libraryText }}
  </Component>
</template>

<script>
import { mapState } from 'vuex'
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import postArtistData from '#/actions/api/library/artists/postData'
import postAlbumData from '#/actions/api/library/albums/postData'
import postTrackData from '#/actions/api/library/tracks/postData'
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
    link () {
      switch (this.model) {
        case 'artist':
          return this.profileLibraryArtistMainLink
        case 'album':
          return this.profileLibraryAlbumMainLink
        case 'track':
          return this.profileLibraryTrackMainLink
        default:
          return {}
      }
    },
    profileLibraryArtistMainLink () {
      return formatProfileLibraryArtistMainLink({
        profileId: this.profileId,
        artistId: this.modelId
      })
    },
    profileId () {
      return this.profileInfo.id.toString()
    },
    profileLibraryAlbumMainLink () {
      return formatProfileLibraryAlbumMainLink({
        profileId: this.profileId,
        albumId: this.modelId
      })
    },
    profileLibraryTrackMainLink () {
      return formatProfileLibraryTrackMainLink({
        profileId: this.profileId,
        trackId: this.modelId
      })
    },
    libraryText () {
      return this.$t(
        `shared.library.${this.libraryTextKey}`
      )
    },
    libraryTextKey () {
      return this.modelId ? 'show' : 'add'
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
