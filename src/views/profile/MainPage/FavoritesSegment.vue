<template>
  <BaseProfileSegmentContainer
    scope="favorites"
    :header-link="headerLink"
    :is-fetch-data="false"
  >
    <FavoritesTabsSegment
      :profile-id="profileId"
    />
  </BaseProfileSegmentContainer>
</template>

<script>
import BaseProfileSegmentContainer
  from '*/components/containers/segments/profile/BaseProfileSegmentContainer.vue'
import FavoritesTabsSegment from './FavoritesSegment/FavoritesTabsSegment.vue'
import {
  main as formatProfileFavoritesMainLink
} from '*/helpers/formatters/links/profile/favorites'

export default {
  name: 'FavoritesSegment',
  components: {
    BaseProfileSegmentContainer,
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
      return formatProfileFavoritesMainLink(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
