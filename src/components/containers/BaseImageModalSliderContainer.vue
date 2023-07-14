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
  ::v-deep(.slick-prev)
    left: 25px
    z-index: 1
  ::v-deep(.slick-next)
    right: 25px
  ::v-deep(.slick-arrow)
    width: 25px
    height: 25px
    &:before
      @extend .text-color-black
      font-size: 25px
  &.inverted
    ::v-deep(.slick-arrow)
      &:before
        @extend .text-color-white
</style>
