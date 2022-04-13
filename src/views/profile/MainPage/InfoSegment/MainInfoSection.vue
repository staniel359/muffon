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

    <BaseProfileOnlineLabel
      class="online-label"
      :profile-data="profileData"
    />
  </div>
</template>

<script>
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseProfileOnlineLabel
  from '*/components/models/profile/BaseProfileOnlineLabel.vue'
import BaseLabel from '*/components/BaseLabel.vue'

export default {
  name: 'MainInfoSection',
  components: {
    BaseImage,
    BaseHeader,
    BaseProfileOnlineLabel,
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
        `roles.${this.role}`
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
  margin: 0.25em 0

.online-label
  margin-top: 0.5em
</style>
