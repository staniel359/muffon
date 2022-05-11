<template>
  <div class="main-content-container">
    <div
      v-if="text"
      class="text main-text-container main-content-section"
      v-text="text"
    />

    <BaseImagesList
      v-if="images?.length"
      class="main-content-section images-list"
      :images="images"
    />

    <BaseArtistsSimpleList
      v-if="artists?.length"
      class="main-content-section"
      :artists="artists"
      is-with-listeners-count
    />

    <BaseAlbumsSimpleList
      v-if="albums?.length"
      class="main-content-section"
      :albums="albums"
      is-with-artist-name
      is-with-listeners-count
    />

    <BaseTracksSimpleList
      v-if="tracks?.length"
      class="main-content-section"
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
    text () {
      return this.modelData.text
    },
    images () {
      return this.modelData.attachments?.images
    },
    artists () {
      return this.modelData.attachments?.artists
    },
    albums () {
      return this.modelData.attachments?.albums
    },
    tracks () {
      return this.modelData.attachments?.tracks
    }
  }
}
</script>

<style lang="sass" scoped>
.images-list
  ::v-deep(.image)
    &:not(:first-child)
      margin-top: 0.75em
</style>
