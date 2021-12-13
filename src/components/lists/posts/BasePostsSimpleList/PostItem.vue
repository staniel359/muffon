<template>
  <div
    class="item main-post-item"
    :class="{ disabled: isDeleted }"
  >
    <BaseDeletedBlock
      v-if="isDeleted"
      model="post"
    />
    <template v-else>
      <BaseProfileImage
        class="avatar"
        :image="profileImage"
      />

      <div class="content">
        <div class="post-top-section">
          <div class="post-nickname-timestamp-block">
            <NicknameSection
              :postData="postData"
            />

            <TimestampSection
              :postData="postData"
            />
          </div>

          <BaseOptionsDropdown
            v-if="isWithOptions"
            class="post-options"
            isWithEditOption
            isWithDeleteOption
            @edit="handleEditOptionClick"
            @delete="handleDeleteOptionClick"
          />

          <BasePostEditModal
            ref="editModal"
            :postData="postData"
            @updated="handleUpdated"
          />

          <BasePostDeleteModal
            ref="deleteModal"
            :postData="postData"
            @deleted="handleDeleted"
          />
        </div>

        <BaseDivider />

        <div
          v-if="content"
          class="text main-text-container"
        >
          {{ content }}
        </div>

        <ImagesSection
          :postData="postData"
        />

        <TracksSection
          :postData="postData"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseDeletedBlock from '@/BaseDeletedBlock.vue'
import BaseProfileImage from '@/models/profile/BaseProfileImage.vue'
import NicknameSection from './PostItem/NicknameSection.vue'
import TimestampSection from './PostItem/TimestampSection.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import BasePostEditModal from '@/modals/post/BasePostEditModal.vue'
import BasePostDeleteModal from '@/modals/post/BasePostDeleteModal.vue'
import BaseDivider from '@/BaseDivider.vue'
import ImagesSection from './PostItem/ImagesSection.vue'
import TracksSection from './PostItem/TracksSection.vue'
import { setToast } from '#/actions/plugins/semantic'

export default {
  name: 'PostItem',
  components: {
    BaseDeletedBlock,
    BaseProfileImage,
    NicknameSection,
    TimestampSection,
    BaseOptionsDropdown,
    BasePostEditModal,
    BasePostDeleteModal,
    BaseDivider,
    ImagesSection,
    TracksSection
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
    profileId: String
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    profileImage () {
      return this.postData.profile.image.extrasmall
    },
    content () {
      return this.postData.content
    },
    isWithOptions () {
      return (
        this.isPostOwner ||
          this.isPageOwner
      )
    },
    isPostOwner () {
      return (
        this.currentProfileId ===
          this.postProfileId
      )
    },
    currentProfileId () {
      return this.profileInfo.id.toString()
    },
    postProfileId () {
      return this.postData.profile.id.toString()
    },
    isPageOwner () {
      return (
        this.currentProfileId ===
          this.profileId
      )
    },
    uuid () {
      return this.postData.uuid
    },
    updatedMessage () {
      return this.$t(
        'shared.updated.post'
      )
    },
    isDeleted () {
      return !!this.postData.isDeleted
    }
  },
  methods: {
    handleEditOptionClick () {
      this.$refs.editModal.show()
    },
    handleDeleteOptionClick () {
      this.$refs.deleteModal.show()
    },
    handleUpdated (value) {
      this.$refs.editModal.hide()

      this.updatePaginationItem({
        uuid: this.uuid,
        value
      })

      setToast({
        message: this.updatedMessage,
        icon: 'green check'
      })
    },
    handleDeleted () {
      this.findPaginationItem({
        uuid: this.uuid
      }).isDeleted = true
    }
  }
}
</script>

<style lang="sass" scoped>
.post-top-section
  @extend .d-flex

.post-nickname-timestamp-block
  @extend .flex-full
</style>
