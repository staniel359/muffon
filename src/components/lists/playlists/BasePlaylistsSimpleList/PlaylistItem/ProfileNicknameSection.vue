<template>
  <div class="middle-aligned">
    <span
      :class="{
        link: !isMainLinkActive
      }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleLinkClick"
      v-text="profileNickname"
    />

    <BasePrivateIcon
      v-if="isProfilePrivate"
      class="right small"
      model="profile"
    />
  </div>
</template>

<script>
import BasePrivateIcon from '@/components/icons/BasePrivateIcon.vue'

export default {
  name: 'ProfileNicknameSection',
  components: {
    BasePrivateIcon
  },
  props: {
    profileData: {
      type: Object,
      required: true
    },
    isMainLinkActive: Boolean
  },
  emits: [
    'activeChange',
    'linkClick'
  ],
  computed: {
    profileNickname () {
      return this.profileData.nickname
    },
    isProfilePrivate () {
      return this.profileData.private
    }
  },
  methods: {
    handleMouseEnter () {
      this.changeActive(
        true
      )
    },
    handleMouseLeave () {
      this.changeActive(
        false
      )
    },
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    changeActive (
      value
    ) {
      this.$emit(
        'activeChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
