<template>
  <BaseSegmentContainer
    class="main-profile-page-info"
  >
    <div class="main-profile-page-image-container">
      <BaseProfileOnlineLabel
        class="online-label"
        :profile-data="profileData"
      />

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
      class="primary circular role-label"
      :is-invertable="false"
      :text="roleText"
    />

    <WasOnlineSection
      :profile-data="profileData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileOnlineLabel
  from '@/components/models/profile/BaseProfileOnlineLabel.vue'
import BaseZoomableImage from '@/components/images/BaseZoomableImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import WasOnlineSection from './InfoSegment/WasOnlineSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileOnlineLabel,
    BaseZoomableImage,
    BaseHeader,
    BaseLabel,
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
    }
  }
}
</script>

<style lang="sass" scoped>
.role-label
  margin-top: 0.5em

.online-label
  @extend .absolute
  top: 0.25em
  right: 0.25em
</style>
