<template>
  <BaseHeaderSegmentsContainer
    :scope="scope"
    :header-link="headerLink"
  >
    <FavoritesTabsSegment
      :profile-id="profileId"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import FavoritesTabsSegment from './FavoritesSegment/FavoritesTabsSegment.vue'
import {
  main as formatProfileFavoritesMainLink
} from '@/helpers/formatters/links/profile/favorites'

export default {
  name: 'FavoritesSegment',
  components: {
    BaseHeaderSegmentsContainer,
    FavoritesTabsSegment
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      scope: 'favorites'
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
