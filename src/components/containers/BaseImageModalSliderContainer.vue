<template>
  <div ref="slider">
    <template
      v-for="imageData in imagesCollection"
      :key="imageData.uuid"
    >
      <slot
        :image="imageData[size]"
      />
    </template>
  </div>
</template>

<script>
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
::v-deep(.slick-slide)
  outline: none
  .image
    border-top: $borderInverted
    border-bottom: $borderInverted
    border-left: $borderInverted
  &:last-child
    .image
      border-right: $borderInverted
</style>
