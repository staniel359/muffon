<template>
  <div class="main-profile-page-info">
    <div class="main-profile-page-image-container">
      <BaseZoomableImage
        model="profile"
        size="medium"
        :image-data="imageData"
        is-circular
      />
    </div>

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

    <WasOnlineSection
      v-if="wasOnline"
      :was-online="wasOnline"
    />
  </div>
</template>

<script>
import BaseZoomableImage from '*/components/images/BaseZoomableImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseLabel from '*/components/BaseLabel.vue'
import BaseProfileOnlineLabel
  from '*/components/models/profile/BaseProfileOnlineLabel.vue'
import WasOnlineSection from './MainInfoSection/WasOnlineSection.vue'

export default {
  name: 'MainInfoSection',
  components: {
    BaseZoomableImage,
    BaseHeader,
    BaseLabel,
    BaseProfileOnlineLabel,
    WasOnlineSection
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
    },
    wasOnline () {
      return this.profileData.was_online
    }
  }
}
</script>

<style lang="sass" scoped>
.role-label
  margin: 0.25em 0

.online-label
  margin-top: 0.5em !important
</style>
