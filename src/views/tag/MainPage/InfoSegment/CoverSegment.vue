<template>
  <BaseSegmentContainer :isLoading="isLoading">
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
    images () {
      return this.artists?.map(artist => {
        return artist.image.small
      })
    },
    artists () {
      return this.tagData?.artists?.slice(0, 15)
    },
    imagesFormatted () {
      return formatCollection(this.images)
    },
    tagDataArgs () {
      return {
        tagName: this.tagName,
        scope: 'artists'
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchTagData,
    fetchData () {
      this.fetchTagData(this.tagDataArgs)
    }
  }
}
</script>

<style lang="sass" scoped>
.main-segment
  @extend .no-padding, .absolute, .w-100
  z-index: -1

.artist-image
  @extend .d-inline
  width: 140px
</style>
