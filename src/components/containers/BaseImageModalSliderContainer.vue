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

<style lang="sass" scoped></style>
