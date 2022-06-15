<template>
  <div class="track-page-left-column main-sticky-container">
    <BaseZoomableImage
      model="track"
      size="medium"
      :image-data="imageData"
    />

    <div class="left-column-extra">
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
.track-page-left-column
  width: 150px

.left-column-extra
  margin-top: 0.5em

.main-self-icons
  @extend .text-align-center
  max-width: 80px
</style>
