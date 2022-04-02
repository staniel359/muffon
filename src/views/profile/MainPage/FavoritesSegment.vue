<template>
  <div class="ui raised segments main-segment-container">
    <BaseHeaderSegment
      scope="favorites"
      :link="headerLink"
    />

    <FavoritesTabsSegment
      :profileId="profileId"
    />
  </div>
</template>

<script>
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import FavoritesTabsSegment from './FavoritesSegment/FavoritesTabsSegment.vue'
import {
  main as formatProfileFavoritesMainLink
} from '*/helpers/formatters/links/profile/favorites'

export default {
  name: 'FavoritesSegment',
  components: {
    BaseHeaderSegment,
    FavoritesTabsSegment
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    headerLink () {
      return formatProfileFavoritesMainLink({
        profileId: this.profileId
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
