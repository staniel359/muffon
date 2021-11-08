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
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
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
    optionModelId: String,
    albumTitle: String,
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
      if (this.optionModelId) {
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
            artistId: this.optionModelId
          })
        case 'album':
          return formatProfileLibraryAlbumMainLink({
            profileId: this.profileId,
            albumId: this.optionModelId
          })
        case 'track':
          return formatProfileLibraryTrackMainLink({
            profileId: this.profileId,
            trackId: this.optionModelId
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
      if (this.optionModelId) {
        return 'BaseLinkContainer'
      } else {
        return 'div'
      }
    }
  },
  methods: {
    handleClick (event) {
      if (this.optionModelId) {
        this.$emit('linkClick')
      } else {
        event.preventDefault()

        this.addToLibrary()
      }
    },
    postArtistData,
    postAlbumData,
    postTrackData,
    addToLibrary () {
      switch (this.model) {
        case 'artist':
          return this.postArtistData({
            artistId: this.modelId
          })
        case 'album':
          return this.postAlbumData({
            albumId: this.modelId,
            tracks: this.albumTracks,
            imageUrl: this.imageUrl
          })
        case 'track':
          return this.postTrackData({
            trackId: this.modelId,
            albumTitle: this.albumTitle,
            imageUrl: this.imageUrl
          })
        default:
          return null
      }
    },
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
