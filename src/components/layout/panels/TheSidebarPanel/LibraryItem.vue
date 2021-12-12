<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
    :link="profileLibraryMainLink"
  >
    <div class="main-sidebar-item-icon-container">
      <i class="headphones grey icon"></i>
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="profileLibraryText"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
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
    profileLibraryMainLink () {
      return formatProfileLibraryMainLink({
        profileId: this.profileId
      })
    },
    profileId () {
      return this.profileInfo.id
    },
    profileLibraryText () {
      return this.$t(
        'layout.navigation.library'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
