<template>
  <BaseFavoriteDeleteOption
    v-if="favoriteId"
    model="track"
    :favorite-id="favoriteId"
  />
  <AddOption
    v-else
    :track-data="trackData"
  />
</template>

<script>
import BaseFavoriteDeleteOption
  from '@/components/dropdowns/options/favorite/BaseFavoriteDeleteOption.vue'
import AddOption from './FavoriteOption/AddOption.vue'

export default {
  name: 'FavoriteOption',
  components: {
    BaseFavoriteDeleteOption,
    AddOption
  },
  props: {
    favoriteId: String,
    trackData: Object
  }
}
</script>

<style lang="sass" scoped></style>
