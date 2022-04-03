<template>
  <Component
    class="ui item"
    :is="component"
    :class="{
      disabled: isLoading,
      'main-link': modelId
    }"
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
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import createProfileLibraryArtist
  from '*/helpers/actions/api/profile/library/artist/create'
import createProfileLibraryAlbum
  from '*/helpers/actions/api/profile/library/album/create'
import createProfileLibraryTrack
  from '*/helpers/actions/api/profile/library/track/create'
import {
  main as formatProfileLibraryArtistMainLink
} from '*/helpers/formatters/links/profile/library/artist'
import {
  main as formatProfileLibraryAlbumMainLink
} from '*/helpers/formatters/links/profile/library/album'
import {
  main as formatProfileLibraryTrackMainLink
} from '*/helpers/formatters/links/profile/library/track'
import { artistName as formatArtistName } from '*/helpers/formatters'

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
        `actions.${this.libraryTextKey}.library`
      )
    },
    libraryTextKey () {
      return this.modelId
        ? 'show'
        : 'addTo'
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
    artistCreateArgs () {
      return {
        artistName: this.artistName
      }
    },
    albumCreateArgs () {
      return {
        albumTitle: this.albumTitle,
        artistName: this.artistName,
        albumTracks: this.albumTracksFormatted,
        imageUrl: this.imageUrl
      }
    },
    trackCreateArgs () {
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

        this.addToLibrary().then(
          this.handleCreateSuccess
        )
      }
    },
    handleCreateSuccess (response) {
      const libraryId =
        response.data.library_id.toString()

      this.setLibraryId(
        libraryId
      )
    },
    createProfileLibraryArtist,
    createProfileLibraryAlbum,
    createProfileLibraryTrack,
    addToLibrary () {
      switch (this.model) {
        case 'artist':
          return this.createProfileLibraryArtist(
            this.artistCreateArgs
          )
        case 'album':
          return this.createProfileLibraryAlbum(
            this.albumCreateArgs
          )
        case 'track':
          return this.createProfileLibraryTrack(
            this.trackCreateArgs
          )
        default:
          return null
      }
    },
    formatAlbumTrack (trackData) {
      const artistName =
        formatArtistName(
          trackData.artists
        )

      const artistData = {
        name: artistName
      }

      return {
        title: trackData.title,
        artist: artistData
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
