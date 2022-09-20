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

        <BaseSendableContentSection
          :model-data="postData"
        />
      </div>

      <BasePostOptionsDropdown
        v-if="isWithOptions"
        :is-with-edit-option="isWithEditOption"
        is-with-delete-option
        @edit-option-click="handleEditOptionClick"
        @delete-option-click="handleDeleteOptionClick"
      />

      <BasePostUpdateModal
        ref="updateModal"
        :key="key"
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
  mapGetters,
  mapState
} from 'vuex'
import BaseDeletedBlock from '@/components/BaseDeletedBlock.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseCommunityTitle
  from '@/components/models/community/BaseCommunityTitle.vue'
import BaseProfileNickname
  from '@/components/models/profile/BaseProfileNickname.vue'
import BaseTimestamp from '@/components/BaseTimestamp.vue'
import BaseSendableContentSection
  from '@/components/models/sendable/BaseSendableContentSection.vue'
import BasePostOptionsDropdown
  from '@/components/dropdowns/post/BasePostOptionsDropdown.vue'
import BasePostUpdateModal
  from '@/components/modals/post/BasePostUpdateModal.vue'
import BasePostDeleteModal
  from '@/components/modals/post/BasePostDeleteModal.vue'
import {
  setToast
} from '@/helpers/actions/plugins/semantic'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'PostItem',
  components: {
    BaseDeletedBlock,
    BaseImage,
    BaseCommunityTitle,
    BaseProfileNickname,
    BaseTimestamp,
    BaseSendableContentSection,
    BasePostOptionsDropdown,
    BasePostUpdateModal,
    BasePostDeleteModal
  },
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
  data () {
    return {
      key: null
    }
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        currentProfileId: 'id'
      }
    ),
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
      return this.profileData.id.toString()
    },
    isPageOwner () {
      return (
        this.currentProfileId ===
          this.profileId
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
      this.showUpdateModal()
    },
    handleDeleteOptionClick () {
      this.showDeleteModal()
    },
    handleUpdated (
      value
    ) {
      this.hideUpdateModal()

      this.updatePaginationItem(
        {
          uuid: this.uuid,
          value
        }
      )

      this.notify()
    },
    handleDeleted () {
      this.paginationItem.isDeleted = true
    },
    notify () {
      setToast(
        {
          message: this.updatedMessage,
          icon: 'green check'
        }
      )
    },
    async showUpdateModal () {
      this.key = generateKey()

      await this.$nextTick()

      this.$refs
        .updateModal
        .show()
    },
    hideUpdateModal () {
      this.$refs
        .updateModal
        .hide()
    },
    showDeleteModal () {
      this.$refs
        .deleteModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
