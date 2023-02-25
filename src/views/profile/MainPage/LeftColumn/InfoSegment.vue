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

    <div
      v-if="isPrivate"
      class="private-icon-container"
    >
      <BasePrivateIcon />
    </div>

    <div
      v-if="isStaff"
      class="role-label-container"
    >
      <BaseLabel
        class="primary circular"
        :is-invertable="false"
        :text="roleText"
      />
    </div>

    <WasOnlineSection
      :profile-data="profileData"
    />

    <i
      v-if="status"
      class="status main-text-container"
      v-html="status"
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
import BasePrivateIcon from '@/components/icons/BasePrivateIcon.vue'
import BaseLabel from '@/components/labels/BaseLabel.vue'
import WasOnlineSection from './InfoSegment/WasOnlineSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileOnlineLabel,
    BaseZoomableImage,
    BaseHeader,
    BasePrivateIcon,
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
    },
    isPrivate () {
      return this.profileData.private
    },
    status () {
      return this.profileData.status
    }
  }
}
</script>

<style lang="sass" scoped>
.private-icon-container
  .icon
    @extend .no-margin

.role-label-container
  margin-top: 0.25em

.online-label
  @extend .absolute
  top: 0.25em
  right: 0.25em

.status
  @extend .word-break-break-word
  margin-top: 0.25em
</style>
