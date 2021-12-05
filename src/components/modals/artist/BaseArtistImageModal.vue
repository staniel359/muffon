<template>
  <BaseImageModalContainer @show="handleShow">
    <div class="ui container main-container main-image-modal-content">
      <MainSlider
        :images="imagesFormatted"
        :syncSlider="thumbsSlider"
        @init="handleMainSliderInit"
      />
      <ThumbsSlider
        :images="imagesFormatted"
        :syncSlider="mainSlider"
        @init="handleThumbsSliderInit"
      />
    </div>
  </BaseImageModalContainer>
</template>

<script>
import BaseImageModalContainer from '@/containers/BaseImageModalContainer.vue'
import MainSlider from './BaseArtistImageModal/MainSlider.vue'
import ThumbsSlider from './BaseArtistImageModal/ThumbsSlider.vue'
import { collection as formatCollection } from '#/formatters'
import { setSliderPosition } from '#/actions/plugins/slick'

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
    }
  },
  emits: [
    'mainSliderInit'
  ],
  data () {
    return {
      mainSlider: null,
      thumbsSlider: null
    }
  },
  computed: {
    imagesFormatted () {
      return formatCollection(this.images)
    }
  },
  methods: {
    handleShow () {
      this.$nextTick(() => {
        setSliderPosition(this.mainSlider)
        setSliderPosition(this.thumbsSlider)
      })
    },
    handleMainSliderInit (el) {
      this.mainSlider = el

      this.$emit('mainSliderInit', el)
    },
    handleThumbsSliderInit (el) {
      this.thumbsSlider = el
    }
  }
}
</script>

<style lang="sass" scoped></style>
