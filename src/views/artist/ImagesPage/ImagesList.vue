<template>
  <div class="ui four column grid">
    <div
      v-for="(imageData, index) in imagesCollection"
      class="column"
      :key="imageData.uuid"
    >
      <div class="main-image-container">
        <BaseImage
          class="rounded bordered artist-image"
          :image="imageData.small"
          @click="handleImageClick(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseImage from '@/images/BaseImage.vue'
import { collection as formatCollection } from '#/formatters'
import { goToSliderSlide } from '#/actions/plugins/slick'
import { showModal } from '#/actions/plugins/semantic'

export default {
  name: 'ImagesList',
  components: {
    BaseImage
  },
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    },
    modal: HTMLDivElement,
    mainSlider: HTMLDivElement
  },
  computed: {
    imagesCollection () {
      return formatCollection(
        this.images
      )
    }
  },
  methods: {
    handleImageClick (index) {
      goToSliderSlide(
        this.mainSlider,
        index
      )

      this.$nextTick(() => {
        showModal(this.modal)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-image
  @extend .cursor-zoom-in
</style>
