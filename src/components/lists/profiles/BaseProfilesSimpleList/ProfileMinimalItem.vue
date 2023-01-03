<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :class="{
      disabled: !profileId
    }"
    :link="profileMainLink"
  >
    <BaseImage
      class="small circular bordered"
      model="profile"
      :image="imageData?.extrasmall"
    />

    <div class="content">
      <div class="nickname-label-container">
        <NicknameSection
          :profile-data="profileData"
        />

        <BasePrivateIcon
          v-if="isPrivate"
        />
      </div>
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import NicknameSection from './ProfileMinimalItem/NicknameSection.vue'
import BasePrivateIcon from '@/components/icons/BasePrivateIcon.vue'
import {
  main as formatProfileMainLink
} from '@/helpers/formatters/links/profile'

export default {
  name: 'ProfileMinimalItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    NicknameSection,
    BasePrivateIcon
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    profileMainLink () {
      if (this.profileId) {
        return formatProfileMainLink(
          {
            profileId: this.profileId
          }
        )
      } else {
        return {}
      }
    },
    profileId () {
      return this.profileData.id
    },
    imageData () {
      return this.profileData.image
    },
    isPrivate () {
      return this.profileData.private
    }
  }
}
</script>

<style lang="sass" scoped>
.nickname-label-container
  @extend .d-flex, .align-items-center
</style>
