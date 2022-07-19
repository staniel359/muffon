<template>
  <BaseFavoriteDeleteOption
    v-if="favoriteId"
    model="album"
    :favorite-id="favoriteId"
  />
  <AddOption
    v-else
    :album-data="albumData"
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
    albumData: Object
  }
}
</script>

<style lang="sass" scoped></style>
