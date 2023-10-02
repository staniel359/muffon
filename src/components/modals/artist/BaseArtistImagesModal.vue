<template>
  <BaseImageModalContainer
    ref="modal"
    class="base-artist-images-modal"
    size="small"
    @show="handleShow"
  >
    <div class="main-image-modal-content">
      <MainSlider
        ref="mainSlider"
        :images="images"
        :sync-slider="thumbsSlider"
        :is-rtl="isRtl"
      />

      <ThumbsSlider
        ref="thumbsSlider"
        :images="images"
        :sync-slider="mainSlider"
        :is-rtl="isRtl"
      />
    </div>
  </BaseImageModalContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseImageModalContainer
  from '@/components/containers/modals/BaseImageModalContainer.vue'
import MainSlider from './BaseArtistImagesModal/MainSlider.vue'
import ThumbsSlider from './BaseArtistImagesModal/ThumbsSlider.vue'
import {
  setSliderPosition,
  goToSliderSlide
} from '@/helpers/actions/plugins/slick'

export default {
  name: 'BaseArtistImagesModal',
  components: {
    BaseImageModalContainer,
    MainSlider,
    ThumbsSlider
  },
  props: {
    images: Array,
    isReset: Boolean
  },
  data () {
    return {
      mainSlider: null,
      thumbsSlider: null
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isRtl'
      ]
    )
  },
  mounted () {
    this.mainSlider =
      this.$refs
        .mainSlider
        .$refs
        .slider
        .$refs
        .slider

    this.thumbsSlider =
      this.$refs
        .thumbsSlider
        .$refs
        .slider
        .$refs
        .slider
  },
  methods: {
    async handleShow () {
      await this.$nextTick()

      if (this.isReset) {
        this.goToSlide(
          0
        )
      }

      setSliderPosition(
        this.mainSlider
      )

      setSliderPosition(
        this.thumbsSlider
      )
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
