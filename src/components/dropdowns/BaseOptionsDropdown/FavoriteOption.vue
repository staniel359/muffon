<template>
  <DeleteOption
    v-if="modelId"
    :model="model"
    :model-id="modelId"
  />
  <Component
    :is="component"
    v-else
    :artist-name="artistName"
    :album-title="albumTitle"
    :track-title="trackTitle"
    :image-url="imageUrl"
  />
</template>

<script>
import DeleteOption from './FavoriteOption/DeleteOption.vue'
import ArtistOption from './FavoriteOption/ArtistOption.vue'
import AlbumOption from './FavoriteOption/AlbumOption.vue'
import TrackOption from './FavoriteOption/TrackOption.vue'

export default {
  name: 'FavoriteOption',
  components: {
    DeleteOption,
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
    imageUrl: String
  },
  data () {
    return {
      components: {
        artist: 'ArtistOption',
        album: 'AlbumOption',
        track: 'TrackOption'
      }
    }
  },
  computed: {
    component () {
      return this.components[
        this.model
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
