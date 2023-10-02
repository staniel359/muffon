<template>
  <div class="main-sticky-container left-column width-20">
    <BaseZoomableImage
      model="track"
      size="medium"
      :image-data="imageData"
    />

    <HeaderSection
      :track-data="trackData"
      :scrollable="scrollable"
    />

    <SelfSection
      :track-data="trackData"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
    />
  </div>
</template>

<script>
import BaseZoomableImage from '@/components/images/BaseZoomableImage.vue'
import HeaderSection from './LeftColumn/HeaderSection.vue'
import SelfSection from './LeftColumn/SelfSection.vue'
import selfMixin from '@/mixins/selfMixin'

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
    trackData: {
      type: Object,
      required: true
    },
    scrollable: HTMLDivElement
  },
  computed: {
    modelData () {
      return this.trackData
    },
    imageData () {
      return this.trackData.image
    }
  },
  watch: {
    trackData: 'handleTrackDataChange'
  },
  methods: {
    handleTrackDataChange () {
      this.setSelfData()
    }
  }
}
</script>

<style lang="sass" scoped>
.left-column
  min-width: 140px
</style>
