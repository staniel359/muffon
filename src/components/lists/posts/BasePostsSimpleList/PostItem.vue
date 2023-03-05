<template>
  <div
    class="item main-simple-list-item main-post-item"
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
        class="small bordered"
        :class="imageClass"
        :model="imageModel"
        :image="imageData?.extrasmall"
      />

      <div class="content">
        <BaseCommunityTitle
          v-if="isByCommunity"
          :community-data="communityData"
        />
        <div
          v-else
          class="profile-nickname-container"
        >
          <BaseProfileNickname
            :profile-data="profileData"
          />

          <BasePrivateIcon
            v-if="isPrivate"
          />
        </div>

        <BaseTimestampSection
          class="description"
          :created="created"
        />

        <BaseSendableContentSection
          :model-data="postData"
        />
      </div>

      <BasePostOptionsDropdown
        v-if="isWithOptions"
        :post-data="postData"
        :is-with-edit-option="isWithEditOption"
        :is-community-creator="isCommunityCreator"
        is-with-delete-option
        @updated="handleUpdated"
        @deleted="handleDeleted"
      />
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
import BaseCommunityTitle
  from '@/components/models/community/BaseCommunityTitle.vue'
import BaseProfileNickname
  from '@/components/models/profile/BaseProfileNickname.vue'
import BasePrivateIcon from '@/components/icons/BasePrivateIcon.vue'
import BaseTimestampSection
  from '@/components/sections/BaseTimestampSection.vue'
import BaseSendableContentSection
  from '@/components/models/sendable/BaseSendableContentSection.vue'
import BasePostOptionsDropdown
  from '@/components/dropdowns/post/BasePostOptionsDropdown.vue'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'PostItem',
  components: {
    BaseDeletedSection,
    BaseImage,
    BaseCommunityTitle,
    BaseProfileNickname,
    BasePrivateIcon,
    BaseTimestampSection,
    BaseSendableContentSection,
    BasePostOptionsDropdown
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
    },
    profileId: String,
    isCommunityCreator: Boolean
  },
  computed: {
    ...mapState(
      profileStore,
      {
        currentProfileId: 'id'
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
        this.currentProfileId ===
          this.postProfileId
      )
    },
    postProfileId () {
      return this.profileData.id?.toString()
    },
    isPageOwner () {
      return (
        this.currentProfileId ===
          this.profileId
      )
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
    },
    isPrivate () {
      return this.profileData.private
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
.profile-nickname-container
  @extend .d-flex, .align-items-center
</style>
