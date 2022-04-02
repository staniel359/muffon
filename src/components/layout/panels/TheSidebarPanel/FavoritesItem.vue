<template>
  <BaseSidebarItem
    icon="star"
    :text="favoritesText"
    :link="favoritesLink"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseSidebarItem from '*/components/BaseSidebarItem.vue'
import {
  main as formatProfileFavoritesMainLink
} from '*/helpers/formatters/links/profile/favorites'

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
      return formatProfileFavoritesMainLink({
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
