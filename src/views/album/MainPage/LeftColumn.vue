<template>
  <div class="album-page-left-column main-sticky-container">
    <BaseZoomableImage
      model="album"
      size="medium"
      :image-data="imageData"
    />

    <div class="left-column-extra">
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
    </div>
  </div>
</template>

<script>
import BaseZoomableImage from '*/components/images/BaseZoomableImage.vue'
import HeaderSection from './LeftColumn/HeaderSection.vue'
import SelfSection from './LeftColumn/SelfSection.vue'
import selfMixin from '*/mixins/selfMixin'

export default {
  name: 'LeftColumn',
  components: {
    BaseZoomableImage,
    HeaderSection,
    SelfSection
  },
  mixins: [
    selfMixin
  ],
  props: {
    albumData: {
      type: Object,
      required: true
    },
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

.left-column-extra
  margin-top: 0.5em
</style>
