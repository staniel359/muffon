<template>
  <BaseAlbumLinkContainer
    class="main-link"
    :album-data="albumData"
  >
    <BaseImage
      class="rounded bordered main-profile-page-image"
      model="album"
      size="small"
      :image="imageData?.medium"
    />

    <BaseHeader
      class="link"
      tag="h3"
      :text="albumTitle"
    />
  </BaseAlbumLinkContainer>
</template>

<script>
import BaseAlbumLinkContainer
  from '*/components/containers/links/album/BaseAlbumLinkContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'

export default {
  name: 'AlbumSection',
  components: {
    BaseAlbumLinkContainer,
    BaseImage,
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
