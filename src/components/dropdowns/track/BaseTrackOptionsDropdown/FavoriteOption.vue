<template>
  <BaseFavoriteDeleteOption
    v-if="favoriteId"
    model="track"
    :favorite-id="favoriteId"
  />
  <AddOption
    v-else
    :artist-name="artistName"
    :track-title="trackTitle"
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
    trackTitle: String,
    albumTitle: String,
    imageUrl: String
  }
}
</script>

<style lang="sass" scoped></style>
