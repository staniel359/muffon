<template>
  <BaseSidebarItem
    icon="favorite"
    :text="text"
    :link-data="linkData"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  main as formatProfileFavoritesLinkData
} from '@/helpers/formatters/links/profile/favorites'

export default {
  name: 'FavoritesItem',
  components: {
    BaseSidebarItem
  },
  props: {
    profileId: {
      type: Number,
      required: true
    }
  },
  computed: {
    text () {
      return this.$t(
        'navigation.favorites'
      )
    },
    linkData () {
      return formatProfileFavoritesLinkData(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
