<template>
  <div class="images-section">
    <BaseBackgroundImagesTableList
      :images="images"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseBackgroundImagesTableList
  from '@/components/lists/backgroundImages/BaseBackgroundImagesTableList.vue'

export default {
  name: 'ImagesSection',
  components: {
    BaseBackgroundImagesTableList
  },
  computed: {
    ...mapState(
      'layout',
      [
        'backgroundImages'
      ]
    ),
    images () {
      return [
        this.defaultImageData,
        ...this.backgroundImages
      ]
    },
    defaultImageData () {
      return {
        id: 0,
        original: this.defaultImage
      }
    },
    defaultImage () {
      return require(
        '@/assets/images/Background.jpg'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.images-section
  margin-top: 1em
</style>
