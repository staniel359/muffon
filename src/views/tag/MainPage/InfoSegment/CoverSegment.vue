<template>
  <BaseSegmentContainer
    class="cover-segment-container"
    :isLoading="isLoading"
  >
    <template v-if="images">
      <BaseImage
        v-for="imageData in imagesFormatted"
        class="artist-image"
        :key="imageData.uuid"
        :image="imageData.name"
      />
    </template>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseImage from '@/BaseImage.vue'
import fetchTagData from '#/actions/api/tag/fetchData'
import { collection as formatCollection } from '#/formatters'

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
      error: null,
      tagData: null
    }
  },
  computed: {
    tagDataArgs () {
      return {
        tagName: this.tagName,
        scope: 'images'
      }
    },
    images () {
      return this.tagData?.images
    },
    imagesFormatted () {
      return formatCollection(
        this.images
      )
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchTagData,
    fetchData () {
      this.fetchTagData(
        this.tagDataArgs
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
