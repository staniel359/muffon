<template>
  <BaseLinkContainer
    :class="[
      'item profile-item',
      'main-sidebar-item',
      {
        inverted: isDarkMode
      }
    ]"
    :link="profileMainLink"
  >
    <div class="main-sidebar-item-icon-container">
      <BaseImage
        class="profile-image circular bordered"
        model="profile"
        :image="imageData?.extrasmall"
      />
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="nickname"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import {
  main as formatProfileMainLink
} from '*/helpers/formatters/links/profile'

export default {
  name: 'ProfileItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    BaseHeader
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    ...mapState(
      'profile',
      {
        profileInfo: 'info'
      }
    ),
    imageData () {
      return this.profileInfo.image
    },
    nickname () {
      return this.profileInfo.nickname
    },
    profileMainLink () {
      return formatProfileMainLink(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.profile-item
  border-bottom: $border
  &.inverted
    border-bottom: $borderInverted

.profile-image
  width: 25px
  height: 25px
</style>
