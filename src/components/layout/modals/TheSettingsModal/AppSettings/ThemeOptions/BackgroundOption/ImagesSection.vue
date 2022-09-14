<template>
  <div class="images-section">
    <BaseImagesTableList
      size="original"
      :images="backgroundImagesWithDefault"
      is-with-clear-button
      is-clickable
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseImagesTableList
  from '*/components/lists/images/BaseImagesTableList.vue'

export default {
  name: 'ImagesSection',
  components: {
    BaseImagesTableList
  },
  computed: {
    ...mapState(
      'layout',
      [
        'backgroundImages'
      ]
    ),
    backgroundImagesWithDefault () {
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
        '*/assets/images/Background.jpg'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.images-section
  margin-top: 1em
</style>
