<template>
  <BaseSegmentContainer
    class="cover-segment-container"
    :is-loading="isLoading"
  >
    <template v-if="images">
      <BaseImage
        v-for="imageData in imagesCollection"
        :key="imageData.uuid"
        class="artist-image"
        :image="imageData.name"
      />
    </template>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import getTag from '*/helpers/actions/api/tag/get'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'CoverSegment',
  components: {
    BaseSegmentContainer,
    BaseImage
  },
  props: {
    tagName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      tagData: null,
      scope: 'images'
    }
  },
  computed: {
    tagArgs () {
      return {
        tagName: this.tagName,
        scope: this.scope
      }
    },
    images () {
      return this.tagData?.images
    },
    imagesCollection () {
      return formatCollection(
        this.images
      )
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getTag,
    getData () {
      this.getTag(
        this.tagArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.cover-segment-container
  @extend .no-padding, .absolute, .w-100
  z-index: -1
  width: 700px !important
  margin-left: -15px !important

.artist-image
  @extend .d-inline
  width: 140px
</style>
