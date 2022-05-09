<template>
  <div class="content-container">
    <div
      v-if="content"
      class="text main-text-container"
      v-text="content"
    />

    <BaseImagesList
      v-if="images.length"
      class="content-section"
      :images="images"
    />

    <BaseArtistsSimpleList
      v-if="artists.length"
      class="content-section"
      :artists="artists"
      is-with-listeners-count
    />

    <BaseAlbumsSimpleList
      v-if="albums.length"
      class="content-section"
      :albums="albums"
      is-with-artist-name
      is-with-listeners-count
    />

    <BaseTracksSimpleList
      v-if="tracks.length"
      class="content-section"
      :tracks="tracks"
      is-with-image
      is-with-artist-name
      is-with-album-title
    />
  </div>
</template>

<script>
import BaseImagesList from '*/components/lists/images/BaseImagesList.vue'
import BaseArtistsSimpleList
  from '*/components/lists/artists/BaseArtistsSimpleList.vue'
import BaseAlbumsSimpleList
  from '*/components/lists/albums/BaseAlbumsSimpleList.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'BaseSendableContentSection',
  components: {
    BaseImagesList,
    BaseArtistsSimpleList,
    BaseAlbumsSimpleList,
    BaseTracksSimpleList
  },
  props: {
    modelData: {
      type: Object,
      required: true
    }
  },
  computed: {
    content () {
      return this.modelData.content
    },
    images () {
      return this.modelData.images
    },
    artists () {
      return this.modelData.artists
    },
    albums () {
      return this.modelData.albums
    },
    tracks () {
      return this.modelData.tracks
    }
  }
}
</script>

<style lang="sass" scoped></style>
