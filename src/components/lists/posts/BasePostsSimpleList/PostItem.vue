<template>
  <div
    class="item main-simple-list-item"
    :class="{ disabled: isDeleted }"
  >
    <BaseDeletedBlock
      v-if="isDeleted"
      model="post"
    />
    <template v-else>
      <BaseProfileImage
        class="small"
        :image="profileImage"
      />

      <div class="content">
        <div class="post-top-section">
          <div class="post-nickname-timestamp-block">
            <BaseProfileNickname
              :profileData="profileData"
            />

            <BaseTimestamp
              class="description"
              :created="created"
            />
          </div>

          <BaseOptionsDropdown
            v-if="isWithOptions"
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

        <div class="content-container">
          <div
            v-if="content"
            class="text main-text-container"
          >
            {{ content }}
          </div>

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
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseDeletedBlock from '@/BaseDeletedBlock.vue'
import BaseProfileImage from '@/models/profile/BaseProfileImage.vue'
import BaseProfileNickname from '@/models/profile/BaseProfileNickname.vue'
import BaseTimestamp from '@/BaseTimestamp.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import BasePostEditModal from '@/modals/post/BasePostEditModal.vue'
import BasePostDeleteModal from '@/modals/post/BasePostDeleteModal.vue'
import BaseImagesSection from '@/BaseImagesSection.vue'
import BaseTracksSection from '@/BaseTracksSection.vue'
import { setToast } from '#/actions/plugins/semantic'

export default {
  name: 'PostItem',
  components: {
    BaseDeletedBlock,
    BaseProfileImage,
    BaseProfileNickname,
    BaseTimestamp,
    BaseOptionsDropdown,
    BasePostEditModal,
    BasePostDeleteModal,
    BaseImagesSection,
    BaseTracksSection
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
      return this.profileData.image.extrasmall
    },
    profileData () {
      return this.postData.profile
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
      return this.profileData.id.toString()
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
    },
    created () {
      return this.postData.created
    },
    images () {
      return this.postData.images
    },
    tracks () {
      return this.postData.tracks
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
.main-simple-list-item
  @extend .align-items-start

.post-top-section
  @extend .d-flex

.post-nickname-timestamp-block
  @extend .flex-full
</style>
