<template>
  <div class="main-library-info">
    <BaseProfileImage
      class="main-library-info-image"
      :image="image"
    />

    <BaseHeader
      tag="h3"
      :text="nickname"
    />

    <BaseLabel
      v-if="isStaff"
      class="primary role-label"
      :isBasic="false"
      :text="roleFormatted"
    />
  </div>
</template>

<script>
import BaseProfileImage from '@/models/profile/BaseProfileImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseLabel from '@/BaseLabel.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'MainInfoSection',
  components: {
    BaseProfileImage,
    BaseHeader,
    BaseLabel
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    image () {
      return this.profileData.image.small
    },
    nickname () {
      return this.profileData.nickname
    },
    isStaff () {
      return this.role === 'creator'
    },
    role () {
      return this.profileData.role
    },
    roleFormatted () {
      return localize(
        `shared.roles.${this.role}`
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.main-library-info-image
  width: 120px
  height: 120px

.role-label
  margin-top: 0.5em
</style>
