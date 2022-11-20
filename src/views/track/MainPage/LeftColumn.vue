<template>
  <div class="track-page-left-column main-sticky-container">
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

    <ListenersSection
      :track-data="trackData"
    />
  </div>
</template>

<script>
import BaseZoomableImage from '@/components/images/BaseZoomableImage.vue'
import HeaderSection from './LeftColumn/HeaderSection.vue'
import SelfSection from './LeftColumn/SelfSection.vue'
import ListenersSection from './LeftColumn/ListenersSection.vue'
import selfMixin from '@/mixins/selfMixin'

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
  width: 140px
</style>
