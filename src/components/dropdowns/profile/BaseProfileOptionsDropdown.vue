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
</template>

<script>
import BaseOptionsDropdownContainer
  from '*/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import FollowOption from './BaseProfileOptionsDropdown/FollowOption.vue'
import MessageOption from './BaseProfileOptionsDropdown/MessageOption.vue'

export default {
  name: 'BaseProfileOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    FollowOption,
    MessageOption
  },
  props: {
    profileData: Object,
    isWithFollowOption: Boolean,
    isWithMessageOption: Boolean
  },
  emits: [
    'messageOptionClick'
  ],
  computed: {
    isRender () {
      return (
        this.isWithFollowOption ||
          this.isWithMessageOption
      )
    }
  },
  methods: {
    handleMessageOptionClick () {
      this.$emit(
        'messageOptionClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
