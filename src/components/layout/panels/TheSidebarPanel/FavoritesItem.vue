<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
    :link="favoritesLinkFormatted"
  >
    <div class="main-sidebar-item-icon-container">
      <i class="star grey icon"></i>
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
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import {
  favorites as formatProfileFavoritesLink
} from '#/formatters/links/profile'

export default {
  name: 'FavoritesItem',
  components: {
    BaseLinkContainer,
    BaseHeader
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    favoritesLinkFormatted () {
      return formatProfileFavoritesLink({
        profileId: this.profileId
      })
    },
    profileId () {
      return this.profileInfo.id.toString()
    },
    textFormatted () {
      return this.$t(
        'layout.navigation.favorites'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
