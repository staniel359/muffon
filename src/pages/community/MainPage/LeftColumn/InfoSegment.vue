<template>
  <BaseTransitionContainer
    :scrollable="scrollable"
  >
    <BaseSegmentContainer>
      <div class="main-simple-list-item">
        <div class="community-image-container">
          <BaseImage
            class="rounded-medium"
            model="community"
            :image="imageData?.extrasmall"
          />
        </div>

        <div class="content">
          <BaseHeader
            tag="h4"
            :text="communityTitle"
          />
        </div>
      </div>
    </BaseSegmentContainer>
  </BaseTransitionContainer>
</template>

<script>
import BaseTransitionContainer
  from '@/components/containers/BaseTransitionContainer.vue'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseTransitionContainer,
    BaseSegmentContainer,
    BaseImage,
    BaseHeader
  },
  props: {
    communityData: {
      type: Object,
      required: true
    },
    scrollable: HTMLDivElement
  },
  computed: {
    imageData () {
      return this.communityData.image
    },
    communityTitle () {
      return this.communityData.title
    }
  }
}
</script>

<style lang="sass" scoped>
.community-image-container
  width: 35px
  height: 35px

[dir="ltr"]
  .content
    margin-left: 0.75em
[dir="rtl"]
  .content
    margin-right: 0.75em
</style>
