<template>
  <BaseSegmentContainer
    class="cover-segment-container no-padding absolute width-100"
    :is-loading="isLoading"
  >
    <div
      v-if="images"
      class="ui five column grid"
    >
      <BaseImage
        v-for="imageData in imagesCollection"
        :key="imageData.uuid"
        class="column no-padding"
        :image="imageData.name"
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import getTag from '@/helpers/actions/api/tag/get'
import {
  collection as formatCollection
} from '@/helpers/formatters'

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
  z-index: -1
</style>
