<template>
  <BaseImageModalContainer
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
          :syncSlider="thumbsSlider"
          @init="handleMainSliderInit"
        />
        <ThumbsSlider
          :images="imagesCollection"
          :syncSlider="mainSlider"
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
import { collection as formatCollection } from '*/helpers/formatters'
import {
  setSliderPosition,
  goToSliderSlide
} from '*/helpers/actions/plugins/slick'
import { generateKey } from '*/helpers/utils'

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
  emits: [
    'mainSliderInit'
  ],
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
    handleShow () {
      this.$nextTick(() => {
        if (this.isReset) {
          goToSliderSlide(
            this.mainSlider, 0
          )
        } else {
          setSliderPosition(
            this.mainSlider
          )
        }

        setSliderPosition(
          this.thumbsSlider
        )
      })
    },
    handleMainSliderInit (el) {
      this.mainSlider = el

      this.$emit(
        'mainSliderInit',
        el
      )
    },
    handleThumbsSliderInit (el) {
      this.thumbsSlider = el
    },
    handleImagesChange () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
