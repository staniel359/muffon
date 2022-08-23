<template>
  <BaseSegmentContainer
    class="basic images-section"
  >
    <BaseImagesTableList
      size="original"
      :images="backgroundImagesWithDefault"
      is-with-clear-button
      is-clickable
    />
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseImagesTableList
  from '*/components/lists/images/BaseImagesTableList.vue'

export default {
  name: 'ImagesSection',
  components: {
    BaseSegmentContainer,
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
  @extend .no-padding
</style>
