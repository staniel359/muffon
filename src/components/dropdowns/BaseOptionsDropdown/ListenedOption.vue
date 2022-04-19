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
  />
</template>

<script>
import DeleteOption from './ListenedOption/DeleteOption.vue'
import ArtistOption from './ListenedOption/ArtistOption.vue'
import AlbumOption from './ListenedOption/AlbumOption.vue'
import TrackOption from './ListenedOption/TrackOption.vue'

export default {
  name: 'ListenedOption',
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
    trackTitle: String
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
