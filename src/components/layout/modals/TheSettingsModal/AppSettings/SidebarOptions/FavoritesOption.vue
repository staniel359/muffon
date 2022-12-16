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
      :is-checked="isSidebarWithFavoritesItem"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import sidebarStore from '@/stores/sidebar'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'FavoritesOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      sidebarStore,
      {
        isSidebarWithFavoritesItem:
          'isWithFavoritesItem'
      }
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
