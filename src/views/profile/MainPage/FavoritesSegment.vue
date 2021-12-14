<template>
  <div class="ui raised segments main-segment-container">
    <HeaderSegment
      :profileId="profileId"
    />

    <FavoritesTabsSegment
      :profileId="profileId"
    />
  </div>
</template>

<script>
import HeaderSegment from './FavoritesSegment/HeaderSegment.vue'
import FavoritesTabsSegment from './FavoritesSegment/FavoritesTabsSegment.vue'

export default {
  name: 'FavoritesSegment',
  components: {
    HeaderSegment,
    FavoritesTabsSegment
  },
  props: {
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>
