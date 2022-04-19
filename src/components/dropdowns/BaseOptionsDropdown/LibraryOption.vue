<template>
  <Component
    :is="linkComponent"
    v-if="modelId"
    :model-id="modelId"
    @click="handleLinkClick"
  />
  <Component
    :is="addComponent"
    v-else
    :artist-name="artistName"
    :album-title="albumTitle"
    :track-title="trackTitle"
    :tracks="albumTracks"
    :image-url="imageUrl"
  />
</template>

<script>
import ArtistLink from './LibraryOption/links/ArtistLink.vue'
import AlbumLink from './LibraryOption/links/AlbumLink.vue'
import TrackLink from './LibraryOption/links/TrackLink.vue'
import ArtistOption from './LibraryOption/ArtistOption.vue'
import AlbumOption from './LibraryOption/AlbumOption.vue'
import TrackOption from './LibraryOption/TrackOption.vue'

export default {
  name: 'LibraryOption',
  components: {
    ArtistLink,
    AlbumLink,
    TrackLink,
    ArtistOption,
    AlbumOption,
    TrackOption
  },
  props: {
    model: {
      type: String,
      required: true
    },
    modelId: String,
    artistName: String,
    albumTitle: String,
    trackTitle: String,
    albumTracks: Array,
    imageUrl: String
  },
  emits: [
    'linkClick'
  ],
  data () {
    return {
      linkComponents: {
        artist: 'ArtistLink',
        album: 'AlbumLink',
        track: 'TrackLink'
      },
      addComponents: {
        artist: 'ArtistOption',
        album: 'AlbumOption',
        track: 'TrackOption'
      }
    }
  },
  computed: {
    linkComponent () {
      return this.linkComponents[
        this.model
      ]
    },
    addComponent () {
      return this.addComponents[
        this.model
      ]
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
