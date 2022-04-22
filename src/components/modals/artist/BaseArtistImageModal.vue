<template>
  <BaseImageModalContainer
    ref="modal"
    @show="handleShow"
  >
    <div
      :class="[
        'ui container',
        'main-container',
        'main-image-modal-content'
      ]"
    >
      <div :key="key">
        <MainSlider
          :images="imagesCollection"
          :sync-slider="thumbsSlider"
          @init="handleMainSliderInit"
        />

        <ThumbsSlider
          :images="imagesCollection"
          :sync-slider="mainSlider"
          @init="handleThumbsSliderInit"
        />
      </div>
    </div>
  </BaseImageModalContainer>
</template>

<script>
import BaseImageModalContainer
  from '*/components/containers/modals/BaseImageModalContainer.vue'
import MainSlider from './BaseArtistImageModal/MainSlider.vue'
import ThumbsSlider from './BaseArtistImageModal/ThumbsSlider.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'
import {
  setSliderPosition,
  goToSliderSlide
} from '*/helpers/actions/plugins/slick'
import {
  generateKey
} from '*/helpers/utils'

export default {
  name: 'BaseArtistImageModal',
  components: {
    BaseImageModalContainer,
    MainSlider,
    ThumbsSlider
  },
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    },
    isReset: Boolean
  },
  data () {
    return {
      key: null,
      mainSlider: null,
      thumbsSlider: null
    }
  },
  computed: {
    imagesCollection () {
      return formatCollection(
        this.images
      )
    }
  },
  watch: {
    images: 'handleImagesChange'
  },
  methods: {
    async handleShow () {
      await this.$nextTick()

      if (this.isReset) {
        this.goToSlide(
          0
        )
      } else {
        setSliderPosition(
          this.mainSlider
        )
      }

      setSliderPosition(
        this.thumbsSlider
      )
    },
    handleMainSliderInit (
      element
    ) {
      this.mainSlider = element
    },
    handleThumbsSliderInit (
      element
    ) {
      this.thumbsSlider = element
    },
    handleImagesChange () {
      this.key = generateKey()
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    goToSlide (
      index
    ) {
      goToSliderSlide(
        this.mainSlider,
        index
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
