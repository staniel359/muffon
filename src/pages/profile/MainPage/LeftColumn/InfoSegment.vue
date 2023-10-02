<template>
  <BaseSegmentContainer
    class="main-profile-page-info"
  >
    <div class="main-profile-page-image-container">
      <BaseProfileOnlineLabel
        class="no-top"
        :profile-data="profileData"
      />

      <BaseZoomableImage
        model="profile"
        size="medium"
        :image-data="imageData"
        is-circular
      />

      <InfoSection
        :profile-data="profileData"
      />
    </div>

    <BaseHeader
      tag="h3"
      :text="nickname"
    />

    <BasePrivateIcon
      v-if="isPrivate"
      class="main-bottom-mini-section"
      :is-small="false"
    />

    <div
      v-if="isCreator"
      class="main-bottom-mini-section"
    >
      <BaseLabel
        class="primary circular main-label"
        :is-invertable="false"
        :text="roleText"
      />
    </div>

    <i
      v-if="status"
      class="main-text-section main-formatted-text-container"
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
import InfoSection from './InfoSegment/InfoSection.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BasePrivateIcon from '@/components/icons/BasePrivateIcon.vue'
import BaseLabel from '@/components/labels/BaseLabel.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileOnlineLabel,
    BaseZoomableImage,
    InfoSection,
    BaseHeader,
    BasePrivateIcon,
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
    isCreator () {
      return (
        this.role === 'creator'
      )
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

<style lang="sass" scoped></style>
