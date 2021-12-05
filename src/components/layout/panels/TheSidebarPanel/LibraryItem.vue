<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
    :link="profileLibraryMainLinkFormatted"
  >
    <div class="main-sidebar-item-icon-container">
      <i class="headphones grey icon"></i>
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="textFormatted"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import {
  main as formatProfileLibraryMainLink
} from '#/formatters/links/profile/library'

export default {
  name: 'LibraryItem',
  components: {
    BaseLinkContainer,
    BaseHeader
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    profileLibraryMainLinkFormatted () {
      return formatProfileLibraryMainLink({
        profileId: this.profileId
      })
    },
    profileId () {
      return this.profileInfo.id
    },
    textFormatted () {
      return this.$t(
        'layout.navigation.library'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
