<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
  >
    <FollowOption
      v-if="isRenderFollowOption"
      :profile-data="profileData"
    />

    <template
      v-if="isRenderMessageOption"
    >
      <MessageOption
        @click="handleMessageOptionClick"
      />

      <BaseProfileMessageModal
        ref="messageModal"
        :profile-data="profileData"
      />
    </template>
  </BaseOptionsPopupContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseOptionsPopupContainer
  from '@/components/containers/popups/BaseOptionsPopupContainer.vue'
import FollowOption from './BaseProfileOptionsPopup/FollowOption.vue'
import MessageOption from './BaseProfileOptionsPopup/MessageOption.vue'
import BaseProfileMessageModal
  from '@/components/modals/profile/BaseProfileMessageModal.vue'

export default {
  name: 'BaseProfileOptionsPopup',
  components: {
    BaseOptionsPopupContainer,
    FollowOption,
    MessageOption,
    BaseProfileMessageModal
  },
  props: {
    profileData: Object,
    isWithFollowOption: Boolean,
    isWithMessageOption: Boolean
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    isRender () {
      return (
        this.isRenderFollowOption ||
          this.isRenderMessageOption
      )
    },
    isRenderFollowOption () {
      return (
        this.profileId &&
          this.isWithFollowOption
      )
    },
    isRenderMessageOption () {
      return (
        this.profileId &&
          this.isWithMessageOption
      )
    }
  },
  methods: {
    handleMessageOptionClick () {
      this.showMessageModal()
    },
    showMessageModal () {
      this.$refs
        .messageModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
