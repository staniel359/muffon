<template>
  <BaseSegmentContainer
    class="raised main-segment-container info-segment"
  >
    <BaseListContainer>
      <div class="item main-simple-list-item main-info-item">
        <div class="image-container">
          <BaseZoomableImage
            model="community"
            size="small"
            :image-data="imageData"
          />
        </div>

        <div class="content">
          <BaseHeader
            tag="h3"
            :text="communityTitle"
          />

          <div
            v-if="description"
            class="description main-text-container"
            v-text="description"
          />

          <InfoSection
            :community-data="communityData"
          />
        </div>

        <BaseCommunityOptionsPopup
          :community-data="communityData"
          :is-with-edit-option="isCommunityCreator"
          :is-with-delete-option="isCommunityCreator"
          is-with-join-option
          is-with-share-option
        />
      </div>
    </BaseListContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import BaseZoomableImage from '@/components/images/BaseZoomableImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import InfoSection from './InfoSegment/InfoSection.vue'
import BaseCommunityOptionsPopup
  from '@/components/popups/community/BaseCommunityOptionsPopup.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseListContainer,
    BaseZoomableImage,
    BaseHeader,
    InfoSection,
    BaseCommunityOptionsPopup
  },
  props: {
    communityData: {
      type: Object,
      required: true
    },
    isCommunityCreator: Boolean
  },
  computed: {
    imageData () {
      return this.communityData.image
    },
    communityTitle () {
      return this.communityData.title
    },
    description () {
      return this.communityData.description
    }
  }
}
</script>

<style lang="sass" scoped>
.info-segment
  margin-bottom: 1.5em !important
</style>
