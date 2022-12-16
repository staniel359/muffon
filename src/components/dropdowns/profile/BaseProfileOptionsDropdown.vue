<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
  >
    <FollowOption
      v-if="isWithFollowOption"
      :profile-data="profileData"
    />

    <MessageOption
      v-if="isWithMessageOption"
      @click="handleMessageOptionClick"
    />
  </BaseOptionsDropdownContainer>

  <BaseProfileMessageModal
    v-if="isWithMessageOption"
    ref="messageModal"
    :profile-data="profileData"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseOptionsDropdownContainer
  from '@/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import FollowOption from './BaseProfileOptionsDropdown/FollowOption.vue'
import MessageOption from './BaseProfileOptionsDropdown/MessageOption.vue'
import BaseProfileMessageModal
  from '@/components/modals/profile/BaseProfileMessageModal.vue'

export default {
  name: 'BaseProfileOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
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
