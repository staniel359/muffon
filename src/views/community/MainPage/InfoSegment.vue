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
        <BaseImage
          class="community-image rounded bordered"
          model="community"
          :image="imageData?.small"
        />

        <div class="content">
          <BaseHeader
            tag="h3"
            :text="communityTitle"
          />

          <div
            v-if="description"
            :class="[
              'community-description description',
              'main-text-container'
            ]"
            v-text="description"
          />

          <div
            class="description community-members-count"
            @click="handleMembersCountClick"
          >
            <span
              class="main-link"
              v-html="membersCountText"
            />
          </div>

          <BaseCommunityMembersModal
            ref="membersModal"
            :community-id="communityId"
          />
        </div>

        <BaseOptionsDropdown
          v-if="isCommunityCreator"
          class="community-options"
          :is-with-edit-option="isCommunityCreator"
          :is-with-delete-option="isCommunityCreator"
          @edit-option-click="handleEditOptionClick"
          @delete-option-click="handleDeleteOptionClick"
        />
      </div>
    </BaseListContainer>
  </BaseSegmentContainer>

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

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseCommunityMembersModal
  from '*/components/modals/community/BaseCommunityMembersModal.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BaseCommunityUpdateModal
  from '*/components/modals/community/BaseCommunityUpdateModal.vue'
import BaseCommunityDeleteModal
  from '*/components/modals/community/BaseCommunityDeleteModal.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseListContainer,
    BaseImage,
    BaseHeader,
    BaseCommunityMembersModal,
    BaseOptionsDropdown,
    BaseCommunityUpdateModal,
    BaseCommunityDeleteModal
  },
  props: {
    communityData: {
      type: Object,
      required: true
    },
    communityCreatorId: {
      type: String,
      required: true
    },
    currentProfileId: {
      type: String,
      required: true
    }
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
    membersCountText () {
      return this.$tc(
        'counters.nominative.members',
        this.membersCount,
        {
          count: this.membersCountStrong
        }
      )
    },
    membersCountStrong () {
      return `<strong>${this.membersCountFormatted}</strong>`
    },
    membersCountFormatted () {
      return formatNumber(
        this.membersCount
      )
    },
    membersCount () {
      return this.communityData.members_count
    },
    communityId () {
      return this.communityData.id.toString()
    },
    isCommunityCreator () {
      return (
        this.currentProfileId ===
          this.communityCreatorId
      )
    }
  },
  methods: {
    handleMembersCountClick () {
      this.showMembersModal()
    },
    handleEditOptionClick () {
      this.showEditModal()
    },
    handleDeleteOptionClick () {
      this.showDeleteModal()
    },
    showMembersModal () {
      this.$refs
        .membersModal
        .show()
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

.community-image
  width: 75px
  height: 75px

.community-options
  @extend .visibility-visible

.community-members-count
  @extend .width-fit-content
</style>
