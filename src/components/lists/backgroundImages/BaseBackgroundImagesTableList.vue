<template>
  <div class="ui four column compact grid">
    <ImageItem
      v-for="imageData in images"
      :key="imageData.id"
      :image-data="imageData"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import ImageItem from './BaseBackgroundImagesTableList/ImageItem.vue'

export default {
  name: 'BaseBackgroundImagesTableList',
  components: {
    ImageItem
  },
  data () {
    return {
      defaultImagePath: require(
        '@/assets/images/Background.jpg'
      )
    }
  },
  computed: {
    ...mapState(
      layoutStore,
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
        path: this.defaultImagePath
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
