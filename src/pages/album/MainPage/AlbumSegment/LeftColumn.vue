<template>
  <div class="main-sticky-container left-column width-25">
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
      v-if="profileId"
      :album-data="albumData"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
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
    albumData: {
      type: Object,
      required: true
    },
    scrollable: HTMLDivElement
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
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
.left-column
  min-width: 180px
</style>
