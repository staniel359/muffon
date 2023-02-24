<template>
  <BaseSegmentContainer
    class="raised community-info-segment main-segment-container"
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

          <MembersSection
            class="description"
            :community-data="communityData"
          />
        </div>

        <BaseCommunityOptionsDropdown
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
import MembersSection from './InfoSegment/MembersSection.vue'
import BaseCommunityOptionsDropdown
  from '@/components/dropdowns/community/BaseCommunityOptionsDropdown.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseListContainer,
    BaseZoomableImage,
    BaseHeader,
    MembersSection,
    BaseCommunityOptionsDropdown
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
.community-info-segment
  margin-bottom: 1.5em
</style>
