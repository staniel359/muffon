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
    albumData: Object
  }
}
</script>

<style lang="sass" scoped></style>
