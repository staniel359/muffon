<template>
  <BaseSegmentContainer
    class="raised main-segment-container"
  >
    <BaseItemContainer>
      <BaseZoomableImage
        class="image image-90"
        model="community"
        size="small"
        :image-data="imageData"
      />

      <div class="content">
        <div
          class="header"
          v-text="communityTitle"
        />

        <div
          v-if="description"
          class="description"
        >
          <BaseCommunityDescription
            :community-data="communityData"
          />
        </div>

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
    </BaseItemContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseZoomableImage from '@/components/images/BaseZoomableImage.vue'
import BaseCommunityDescription
  from '@/components/models/community/BaseCommunityDescription.vue'
import InfoSection from './InfoSegment/InfoSection.vue'
import BaseCommunityOptionsPopup
  from '@/components/popups/community/BaseCommunityOptionsPopup.vue'
import BaseItemContainer
  from '@/components/containers/item/BaseItemContainer.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseZoomableImage,
    BaseCommunityDescription,
    InfoSection,
    BaseCommunityOptionsPopup,
    BaseItemContainer
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

<style lang="sass" scoped></style>
