<template>
  <BaseFavoriteDeleteOption
    v-if="favoriteId"
    model="artist"
    :favorite-id="favoriteId"
  />
  <AddOption
    v-else
    :artist-data="artistData"
  />
</template>

<script>
import BaseFavoriteDeleteOption
  from '@/components/popups/options/BaseFavoriteDeleteOption.vue'
import AddOption from './FavoriteOption/AddOption.vue'

export default {
  name: 'FavoriteOption',
  components: {
    BaseFavoriteDeleteOption,
    AddOption
  },
  props: {
    favoriteId: Number,
    artistData: Object
  }
}
</script>

<style lang="sass" scoped></style>
