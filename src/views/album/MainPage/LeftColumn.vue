<template>
  <div class="album-page-left-column main-sticky-container">
    <BaseZoomableImage
      model="album"
      size="medium"
      :image-data="imageData"
    />

    <HeaderSection
      :album-data="albumData"
      :scrollable="scrollable"
    />

    <SelfSection
      :album-data="albumData"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
    />

    <ListenersSection
      :album-data="albumData"
      :request-album-data="requestAlbumData"
    />
  </div>
</template>

<script>
import BaseZoomableImage from '*/components/images/BaseZoomableImage.vue'
import HeaderSection from './LeftColumn/HeaderSection.vue'
import SelfSection from './LeftColumn/SelfSection.vue'
import ListenersSection from './LeftColumn/ListenersSection.vue'
import selfMixin from '*/mixins/selfMixin'

export default {
  name: 'LeftColumn',
  components: {
    BaseZoomableImage,
    HeaderSection,
    SelfSection,
    ListenersSection
  },
  mixins: [
    selfMixin
  ],
  props: {
    albumData: {
      type: Object,
      required: true
    },
    requestAlbumData: Object,
    scrollable: HTMLDivElement
  },
  computed: {
    modelData () {
      return this.albumData
    },
    imageData () {
      return this.albumData.image
    }
  },
  watch: {
    albumData: 'handleAlbumDataChange'
  },
  methods: {
    handleAlbumDataChange () {
      this.setSelfData()
    }
  }
}
</script>

<style lang="sass" scoped>
.album-page-left-column
  width: 190px
</style>
