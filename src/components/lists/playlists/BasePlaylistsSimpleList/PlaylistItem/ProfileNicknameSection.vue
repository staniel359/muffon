<template>
  <div>
    <span
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <span
        :class="{
          link: !isMainLinkActive
        }"
        @click="handleLinkClick"
        v-text="profileNickname"
      />

      <BasePrivateIcon
        v-if="isProfilePrivate"
        class="right small"
      />
    </span>
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
