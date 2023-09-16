<template>
  <div
    class="base-image-modal-slider-container"
    :class="{
      inverted: isDarkMode
    }"
  >
    <div
      ref="slider"
    >
      <template
        v-for="imageData in imagesCollection"
        :key="imageData.uuid"
      >
        <slot
          :image="imageData[size]"
        />
      </template>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  setSlider,
  setSliderOptions
} from '@/helpers/actions/plugins/slick'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'BaseImageModalSliderContainer',
  props: {
    size: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      default () {
        return []
      }
    },
    options: Object
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    imagesCollection () {
      return formatCollection(
        this.images
      )
    }
  },
  watch: {
    options: 'handleOptionsChange'
  },
  mounted () {
    setSlider(
      this.$refs.slider,
      this.options
    )
  },
  methods: {
    handleOptionsChange (
      value
    ) {
      setSliderOptions(
        this.$refs.slider,
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.base-image-modal-slider-container
  :deep(.slick-prev)
    z-index: 1
  :deep(.slick-arrow)
    width: 25px
    height: 25px
    &:before
      @extend .text-color-black
      font-size: 25px
[dir="ltr"]
  .base-image-modal-slider-container
    :deep(.slick-prev)
      left: 25px
    :deep(.slick-next)
      right: 25px
[dir="rtl"]
  .base-image-modal-slider-container
    :deep(.slick-prev)
      right: 25px
    :deep(.slick-next)
      left: 25px
</style>
