<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
  >
    <FollowOption
      v-if="isWithFollowOption"
      :profile-data="profileData"
    />

    <template
      v-if="isWithMessageOption"
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
        this.profileId &&
          this.isWithProfileOptions
      )
    },
    isWithProfileOptions () {
      return (
        this.isWithFollowOption ||
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
