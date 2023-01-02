<template>
  <BaseLinkContainer
    class="item main-sidebar-item main-menu-item top-item"
    :class="{
      inverted: isDarkMode,
      'primary active': isMatchedPath
    }"
    :link="profileMainLink"
  >
    <div class="icon-container">
      <BaseImage
        class="circular bordered"
        model="profile"
        :image="imageData?.extrasmall"
      />
    </div>

    <div class="content-container">
      <strong
        v-text="nickname"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import profileStore from '@/stores/profile'
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import {
  main as formatProfileMainLink
} from '@/helpers/formatters/links/profile'

export default {
  name: 'ProfileItem',
  components: {
    BaseLinkContainer,
    BaseImage
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    ...mapState(
      profileStore,
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
    },
    isMatchedPath () {
      return this.currentPath
        .includes(
          this.path
        )
    },
    currentPath () {
      return this.$route.path
    },
    path () {
      return this.profileMainLink.path
    }
  }
}
</script>

<style lang="sass" scoped></style>
