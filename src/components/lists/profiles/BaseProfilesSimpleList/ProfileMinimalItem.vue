<template>
  <BaseLinkContainer
    class="item main-simple-list-item middle-aligned"
    :class="{
      disabled: !profileId
    }"
    :link="profileLink"
  >
    <BaseImage
      class="circular image-30"
      model="profile"
      :image="imageData?.extrasmall"
    />

    <div class="content">
      <div class="middle-aligned">
        <NicknameSection
          :profile-data="profileData"
        />

        <BasePrivateIcon
          v-if="isPrivate"
          class="right small"
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
  main as formatProfileLink
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
    profileLink () {
      if (this.profileId) {
        return formatProfileLink(
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

<style lang="sass" scoped></style>
