<template>
  <div class="main-profile-page-info">
    <BaseImage
      class="main-profile-page-image circular bordered"
      model="profile"
      :image="imageData?.medium"
    />

    <BaseHeader
      tag="h3"
      :text="nickname"
    />

    <BaseLabel
      v-if="isStaff"
      class="primary role-label"
      :text="roleText"
    />
  </div>
</template>

<script>
import BaseImage from '@/images/BaseImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseLabel from '@/BaseLabel.vue'

export default {
  name: 'MainInfoSection',
  components: {
    BaseImage,
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
    imageData () {
      return this.profileData.image
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
    roleText () {
      return this.$t(
        `shared.profile.roles.${this.role}`
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.main-profile-page-image
  width: 120px
  height: 120px

.role-label
  margin-top: 0.5em
</style>
