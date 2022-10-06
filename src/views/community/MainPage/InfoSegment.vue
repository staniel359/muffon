<template>
  <BaseSegmentContainer
    :class="[
      'raised community-info-segment',
      'main-segment-container'
    ]"
  >
    <BaseListContainer>
      <div class="item main-simple-list-item">
        <div class="community-image-container">
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

          <BaseTimestamp
            class="description"
            :created="created"
            is-only-date
          />
        </div>

        <BaseCommunityOptionsDropdown
          class="community-options"
          :community-data="communityData"
          :share-data="shareData"
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
import BaseTimestamp from '@/components/BaseTimestamp.vue'
import BaseCommunityOptionsDropdown
  from '@/components/dropdowns/community/BaseCommunityOptionsDropdown.vue'
import {
  community as formatCommunityShareData
} from '@/helpers/formatters/share'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseListContainer,
    BaseZoomableImage,
    BaseHeader,
    BaseTimestamp,
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
    },
    shareData () {
      return formatCommunityShareData(
        this.communityData
      )
    },
    created () {
      return this.communityData.created
    }
  }
}
</script>

<style lang="sass" scoped>
.community-info-segment
  margin-bottom: 1.5em

.community-image-container
  width: 75px
  height: 75px

.content
  margin-left: 0.75em

.community-options
  @extend .visibility-visible
</style>
