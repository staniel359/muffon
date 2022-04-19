<template>
  <div
    class="item main-simple-list-item main-post-item"
    :class="{
      disabled: isDeleted
    }"
  >
    <BaseDeletedBlock
      v-if="isDeleted"
      model="post"
    />
    <template v-else>
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

        <BaseProfileNickname
          v-else
          :profile-data="profileData"
        />

        <BaseTimestamp
          class="description"
          :created="created"
        />

        <div class="content-container">
          <div
            v-if="content"
            class="text main-text-container"
            v-text="content"
          />

          <BaseImagesSection
            v-if="images"
            class="content-section"
            :images="images"
          />

          <BaseTracksSection
            v-if="tracks"
            class="content-section"
            :tracks="tracks"
          />
        </div>
      </div>

      <BaseOptionsDropdown
        v-if="isWithOptions"
        :is-with-edit-option="isWithEditOption"
        is-with-delete-option
        @edit-option-click="handleEditOptionClick"
        @delete-option-click="handleDeleteOptionClick"
      />

      <BasePostUpdateModal
        ref="updateModal"
        :post-data="postData"
        :is-with-as-community-option="isCommunityCreator"
        @success="handleUpdated"
      />

      <BasePostDeleteModal
        ref="deleteModal"
        :post-data="postData"
        @success="handleDeleted"
      />
    </template>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseDeletedBlock from '*/components/BaseDeletedBlock.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseCommunityTitle
  from '*/components/models/community/BaseCommunityTitle.vue'
import BaseProfileNickname
  from '*/components/models/profile/BaseProfileNickname.vue'
import BaseTimestamp from '*/components/BaseTimestamp.vue'
import BaseImagesSection from '*/components/BaseImagesSection.vue'
import BaseTracksSection from '*/components/BaseTracksSection.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BasePostUpdateModal
  from '*/components/modals/post/BasePostUpdateModal.vue'
import BasePostDeleteModal
  from '*/components/modals/post/BasePostDeleteModal.vue'
import {
  setToast
} from '*/helpers/actions/plugins/semantic'

export default {
  name: 'PostItem',
  components: {
    BaseDeletedBlock,
    BaseImage,
    BaseCommunityTitle,
    BaseProfileNickname,
    BaseTimestamp,
    BaseImagesSection,
    BaseTracksSection,
    BaseOptionsDropdown,
    BasePostUpdateModal,
    BasePostDeleteModal
  },
  inject: [
    'findPaginationItem',
    'updatePaginationItem'
  ],
  props: {
    postData: {
      type: Object,
      required: true
    },
    profileId: String,
    communityCreatorId: String
  },
  computed: {
    ...mapState(
      'profile',
      {
        profileInfo: 'info'
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
    content () {
      return this.postData.content
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
    currentProfileId () {
      return this.profileInfo.id.toString()
    },
    postProfileId () {
      return this.profileData.id.toString()
    },
    isPageOwner () {
      return (
        this.currentProfileId ===
          this.profileId
      )
    },
    isCommunityCreator () {
      return (
        this.currentProfileId ===
          this.communityCreatorId
      )
    },
    updatedMessage () {
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
    images () {
      return this.postData.images
    },
    tracks () {
      return this.postData.tracks
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
        return 'rounded'
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
    handleEditOptionClick () {
      this.$refs
        .updateModal
        .show()
    },
    handleDeleteOptionClick () {
      this.$refs
        .deleteModal
        .show()
    },
    handleUpdated (
      value
    ) {
      this.$refs
        .updateModal
        .hide()

      this.updatePaginationItem(
        {
          uuid: this.uuid,
          value
        }
      )

      this.notify()
    },
    handleDeleted () {
      this.paginationItem
        .isDeleted = true
    },
    notify () {
      setToast(
        {
          message: this.updatedMessage,
          icon: 'green check'
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
