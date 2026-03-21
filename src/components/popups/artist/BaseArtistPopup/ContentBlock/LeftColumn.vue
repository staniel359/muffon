<template>
  <div class="left-column">
    <div class="main-visibility-container relative">
      <BaseArtistOptionsPopup
        :key="optionsPopupKey"
        :artist-data="artistData"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
        :is-transparent="false"
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
        is-nested
        @active-change="handleOptionsActiveChange"
      />

      <BaseArtistImage
        class="image-100"
        size="medium"
        :image-data="imageData"
        :artist-name="artistName"
        @load-end="handleImageLoadEnd"
      />
    </div>

    <div class="main-bottom-medium-section">
      <BaseSelfIcons
        class="centered"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
        is-with-library-icon
        is-with-favorite-icon
        is-with-bookmark-icon
      />
    </div>

    <RecommendationSection
      v-if="recommendationData"
      class="main-bottom-medium-section d-flex justify-content-center"
      :recommendation-data="recommendationData"
    />
  </div>
</template>

<script>
import BaseArtistImage from '@/components/models/artist/BaseArtistImage.vue'
import RecommendationSection from './LeftColumn/RecommendationSection.vue'
import BaseArtistOptionsPopup
  from '@/components/popups/artist/BaseArtistOptionsPopup.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'

import {
  generateKey
} from '@/helpers/utils'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'LeftColumn',
  components: {
    BaseArtistImage,
    RecommendationSection,
    BaseArtistOptionsPopup,
    BaseSelfIcons
  },
  mixins: [
    selfMixin
  ],
  inject: [
    'updateArtistImage',
    'setIsOptionsActive'
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isVisible: Boolean
  },
  data () {
    return {
      optionsPopupKey: null
    }
  },
  computed: {
    modelData () {
      return this.artistData
    },
    imageData () {
      return this.artistData.image
    },
    artistName () {
      return this.artistData.name
    },
    recommendationData () {
      return this.artistData.recommendation
    }
  },
  watch: {
    isVisible: 'handleIsVisibleChange'
  },
  methods: {
    handleImageLoadEnd (
      value
    ) {
      this.updateArtistImage(
        value
      )
    },
    handleIsVisibleChange (
      value
    ) {
      if (value) {
        this.optionsPopupKey = generateKey()
      }
    },
    handleOptionsActiveChange (
      value
    ) {
      this.setIsOptionsActive(
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
