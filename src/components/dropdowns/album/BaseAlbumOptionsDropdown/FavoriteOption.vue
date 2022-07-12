<template>
  <BaseFavoriteDeleteOption
    v-if="favoriteId"
    model="album"
    :favorite-id="favoriteId"
  />
  <AddOption
    v-else
    :artist-name="artistName"
    :album-title="albumTitle"
    :image-url="imageUrl"
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
    artistName: String,
    albumTitle: String,
    imageUrl: String
  }
}
</script>

<style lang="sass" scoped></style>
