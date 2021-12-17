<template>
  <BaseSidebarItem
    icon="star"
    :text="favoritesText"
    :link="favoritesLink"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseSidebarItem from '@/BaseSidebarItem.vue'
import {
  favorites as formatProfileFavoritesLink
} from '#/formatters/links/profile'

export default {
  name: 'FavoritesItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    favoritesText () {
      return this.$t(
        'navigation.favorites'
      )
    },
    favoritesLink () {
      return formatProfileFavoritesLink({
        profileId: this.profileId
      })
    },
    profileId () {
      return this.profileInfo.id.toString()
    }
  }
}
</script>

<style lang="sass" scoped></style>
