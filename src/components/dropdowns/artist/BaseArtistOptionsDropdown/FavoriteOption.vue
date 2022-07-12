<template>
  <BaseFavoriteDeleteOption
    v-if="favoriteId"
    model="artist"
    :favorite-id="favoriteId"
  />
  <AddOption
    v-else
    :artist-name="artistName"
  />
</template>

<script>
import BaseFavoriteDeleteOption
  from '*/components/dropdowns/options/favorite/BaseFavoriteDeleteOption.vue'
import AddOption from './FavoriteOption/AddOption.vue'

export default {
  name: 'FavoriteOption',
  components: {
    BaseFavoriteDeleteOption,
    AddOption
  },
  props: {
    favoriteId: String,
    artistName: String
  }
}
</script>

<style lang="sass" scoped></style>
