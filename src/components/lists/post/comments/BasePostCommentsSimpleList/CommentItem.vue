<template>
  <div
    class="comment main-simple-list-item not-padded main-list-bottom-section"
    :class="{
      disabled: isDeleted
    }"
  >
    <BaseDeletedSection
      v-if="isDeleted"
      model="comment"
    />
    <template
      v-else
    >
      <BaseImage
        class="image-30"
        :class="imageClass"
        :model="imageModel"
        :image="imageData?.extrasmall"
      />

      <div class="content">
        <div class="middle-aligned main-visibility-container">
          <div class="flex-full">
            <CreatorSection
              :comment-data="commentData"
            />

            <BaseTimestampSection
              class="description"
              :created="created"
            />
          </div>

          <BasePostCommentOptionsPopup
            v-if="isWithOptions"
            class="invisible-item"
            :comment-data="commentData"
            :is-with-edit-option="isWithEditOption"
            :is-community-creator="isCommunityCreator"
            is-with-delete-option
            @updated="handleUpdated"
            @deleted="handleDeleted"
          />
        </div>

        <BaseSendableContentSection
          class="sendable-content-section main-bottom-small-section"
          :model-data="commentData"
        />
      </div>
    </template>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseDeletedSection from '@/components/sections/BaseDeletedSection.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import CreatorSection from './CommentItem/CreatorSection.vue'
import BaseTimestampSection
  from '@/components/sections/BaseTimestampSection.vue'
import BaseSendableContentSection
  from '@/components/models/sendable/BaseSendableContentSection.vue'
import BasePostCommentOptionsPopup
  from '@/components/popups/post/comment/BasePostCommentOptionsPopup.vue'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'CommentItem',
  components: {
    BaseDeletedSection,
    BaseImage,
    CreatorSection,
    BaseTimestampSection,
    BaseSendableContentSection,
    BasePostCommentOptionsPopup
  },
  mixins: [
    notificationMixin
  ],
  inject: {
    updatePaginationItem: {
      default: () => false
    },
    findPaginationItem: {
      default: () => false
    },
    updateListItem: {
      default: () => false
    },
    findListItem: {
      default: () => false
    }
  },
  props: {
    commentData: {
      type: Object,
      required: true
    },
    isPaginated: {
      type: Boolean,
      default: true
    },
    isCommunityCreator: Boolean
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    isByCommunity () {
      return this.commentData.by_community
    },
    imageClass () {
      if (this.isByCommunity) {
        return 'rounded-medium'
      } else {
        return 'circular'
      }
    },
    imageModel () {
      if (this.isByCommunity) {
        return 'community'
      } else {
        return 'profile'
      }
    },
    imageData () {
      if (this.isByCommunity) {
        return this.communityData.image
      } else {
        return this.profileData.image
      }
    },
    communityData () {
      return this.commentData.community
    },
    profileData () {
      return this.commentData.profile
    },
    created () {
      return this.commentData.created
    },
    isDeleted () {
      return !!this.commentData.isDeleted
    },
    isWithOptions () {
      return (
        this.isCommentCreator ||
          this.isPostCreator ||
          this.isPageOwner ||
          this.isCommunityCreator
      )
    },
    isCommentCreator () {
      return (
        this.profileId ===
          this.commentProfileId
      )
    },
    commentProfileId () {
      return this.profileData
        .id
        .toString()
    },
    isPostCreator () {
      return (
        this.profileId ===
          this.postProfileId
      )
    },
    postProfileId () {
      return this.postProfileData
        .id
        .toString()
    },
    postProfileData () {
      return this.postData.profile
    },
    postData () {
      return this.commentData.post
    },
    isPageOwner () {
      return (
        this.profileId ===
          this.pageProfileId
      )
    },
    pageProfileId () {
      return this.otherProfileData
        ?.id
        ?.toString()
    },
    otherProfileData () {
      return this.postData.other_profile
    },
    isWithEditOption () {
      return this.isCommentCreator
    },
    uuid () {
      return this.commentData.uuid
    },
    item () {
      if (this.isPaginated) {
        return this.findPaginationItem(
          {
            uuid: this.uuid
          }
        )
      } else {
        return this.findListItem(
          {
            uuid: this.uuid
          }
        )
      }
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.updated.comment'
      )
    }
  },
  methods: {
    handleUpdated (
      value
    ) {
      this.updateItem(
        value
      )

      this.notifySuccess()
    },
    handleDeleted () {
      this.item.isDeleted = true
    },
    updateItem (
      value
    ) {
      const updateArgs = {
        uuid: this.uuid,
        value
      }

      if (this.isPaginated) {
        this.updatePaginationItem(
          updateArgs
        )
      } else {
        this.updateListItem(
          updateArgs
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.sendable-content-section
  :deep(.media-item)
    max-width: 250px
</style>
