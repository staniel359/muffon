<template>
  <div class="option">
    <BaseIcon
      icon="star"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="favoritesText"
    />

    <BaseToggle
      store-key="sidebar.isWithFavoritesItem"
      :is-checked="isWithFavoritesItem"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/BaseToggle.vue'

export default {
  name: 'FavoritesOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'sidebar',
      [
        'isWithFavoritesItem'
      ]
    ),
    favoritesText () {
      return this.$t(
        'navigation.favorites'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
