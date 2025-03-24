<template>
  <div class="main-profile-page-image-container">
    <BaseZoomableImage
      model="album"
      size="medium"
      :image-data="imageData"
    />
  </div>

  <BaseAlbumLinkContainer
    class="main-link main-profile-page-info"
    :album-data="albumData"
  >
    <BaseHeader
      class="link"
      tag="h3"
      :text="albumTitle"
    />
  </BaseAlbumLinkContainer>
</template>

<script>
import BaseAlbumLinkContainer
  from '@/components/containers/links/album/BaseAlbumLinkContainer.vue'
import BaseZoomableImage from '@/components/images/BaseZoomableImage.vue'
import BaseHeader from '@/components/headers/BaseHeader.vue'

export default {
  name: 'AlbumSection',
  components: {
    BaseAlbumLinkContainer,
    BaseZoomableImage,
    BaseHeader
  },
  props: {
    albumData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageData () {
      return this.albumData.image
    },
    albumTitle () {
      return this.albumData.title
    }
  }
}
</script>

<style lang="sass" scoped></style>
