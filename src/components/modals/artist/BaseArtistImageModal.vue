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
          ref="mainSlider"
          :images="imagesCollection"
          :sync-slider="thumbsSlider"
        />

        <ThumbsSlider
          ref="thumbsSlider"
          :images="imagesCollection"
          :sync-slider="mainSlider"
        />
      </div>
    </div>
  </BaseImageModalContainer>
</template>

<script>
import BaseImageModalContainer
  from '@/components/containers/modals/BaseImageModalContainer.vue'
import MainSlider from './BaseArtistImageModal/MainSlider.vue'
import ThumbsSlider from './BaseArtistImageModal/ThumbsSlider.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'
import {
  setSliderPosition,
  goToSliderSlide
} from '@/helpers/actions/plugins/slick'
import {
  generateKey
} from '@/helpers/utils'

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
  mounted () {
    this.mainSlider =
      this.$refs.mainSlider.$el

    this.thumbsSlider =
      this.$refs.thumbsSlider.$el
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
