<template>
  <BaseSegmentContainer
    :class="[
      'raised community-info-segment',
      'main-segment-container'
    ]"
  >
    <BaseListContainer>
      <div
        :class="[
          'item main-simple-list-item',
          'main-community-info-item'
        ]"
      >
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
          @edit-option-click="handleEditOptionClick"
          @delete-option-click="handleDeleteOptionClick"
        />

        <template
          v-if="isCommunityCreator"
        >
          <BaseCommunityUpdateModal
            ref="editModal"
            :community-data="communityData"
          />

          <BaseCommunityDeleteModal
            ref="deleteModal"
            :community-data="communityData"
            is-delete-with-redirect
          />
        </template>
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
import BaseCommunityUpdateModal
  from '@/components/modals/community/BaseCommunityUpdateModal.vue'
import BaseCommunityDeleteModal
  from '@/components/modals/community/BaseCommunityDeleteModal.vue'
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
    BaseCommunityOptionsDropdown,
    BaseCommunityUpdateModal,
    BaseCommunityDeleteModal
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
  },
  methods: {
    handleEditOptionClick () {
      this.showEditModal()
    },
    handleDeleteOptionClick () {
      this.showDeleteModal()
    },
    showEditModal () {
      this.$refs
        .editModal
        .show()
    },
    showDeleteModal () {
      this.$refs
        .deleteModal
        .show()
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

.community-options
  @extend .visibility-visible
</style>
