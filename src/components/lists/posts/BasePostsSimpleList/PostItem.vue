<template>
  <div
    class="item main-simple-list-item"
    :class="{
      disabled: isDeleted
    }"
  >
    <BaseDeletedSection
      v-if="isDeleted"
      model="post"
    />
    <template
      v-else
    >
      <BaseImage
        class="image-40"
        :class="imageClass"
        :model="imageModel"
        :image="imageData?.extrasmall"
      />

      <div class="content">
        <div class="middle-aligned main-visibility-container">
          <div class="flex-full">
            <CreatorSection
              :post-data="postData"
            />

            <BaseTimestampSection
              class="description"
              :created="created"
            />
          </div>

          <BasePostOptionsPopup
            v-if="isWithOptions"
            class="invisible-item"
            :post-data="postData"
            :is-with-edit-option="isWithEditOption"
            :is-community-creator="isCommunityCreator"
            is-with-delete-option
            @updated="handleUpdated"
            @deleted="handleDeleted"
          />
        </div>

        <BaseSendableContentSection
          class="sendable-content-section"
          :model-data="postData"
        />

        <CommentsSection
          :post-data="postData"
          :is-community-creator="isCommunityCreator"
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
import CreatorSection from './PostItem/CreatorSection.vue'
import BaseTimestampSection
  from '@/components/sections/BaseTimestampSection.vue'
import BaseSendableContentSection
  from '@/components/models/sendable/BaseSendableContentSection.vue'
import BasePostOptionsPopup
  from '@/components/popups/post/BasePostOptionsPopup.vue'
import CommentsSection from './PostItem/CommentsSection.vue'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'PostItem',
  components: {
    BaseDeletedSection,
    BaseImage,
    CreatorSection,
    BaseTimestampSection,
    BaseSendableContentSection,
    BasePostOptionsPopup,
    CommentsSection
  },
  mixins: [
    notificationMixin
  ],
  inject: {
    findPaginationItem: {
      default: () => false
    },
    updatePaginationItem: {
      default: () => false
    }
  },
  props: {
    postData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    imageData () {
      if (this.isByCommunity) {
        return this.communityData.image
      } else {
        return this.profileData.image
      }
    },
    communityData () {
      return this.postData.community
    },
    profileData () {
      return this.postData.profile
    },
    isWithOptions () {
      return (
        this.isPostCreator ||
          this.isPageOwner ||
          this.isCommunityCreator
      )
    },
    isPostCreator () {
      return (
        this.profileId ===
          this.postProfileId
      )
    },
    postProfileId () {
      return this.profileData
        .id
        ?.toString()
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
    isCommunityCreator () {
      return (
        this.profileId ===
          this.communityCreatorId
      )
    },
    communityCreatorId () {
      return this.communityCreatorData
        ?.id
        ?.toString()
    },
    communityCreatorData () {
      return this.communityData?.creator
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.updated.post'
      )
    },
    isDeleted () {
      return !!this.postData.isDeleted
    },
    created () {
      return this.postData.created
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.postData.uuid
    },
    isWithEditOption () {
      return this.isPostCreator
    },
    isByCommunity () {
      return this.postData.by_community
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
    }
  },
  methods: {
    handleUpdated (
      value
    ) {
      this.updatePaginationItem(
        {
          uuid: this.uuid,
          value
        }
      )

      this.notifySuccess()
    },
    handleDeleted () {
      this.paginationItem.isDeleted = true
    }
  }
}
</script>

<style lang="sass" scoped>
.main-simple-list-item
  padding: 2rem 1.5rem !important

.sendable-content-section
  :deep(.media-item)
    max-width: 450px
</style>
