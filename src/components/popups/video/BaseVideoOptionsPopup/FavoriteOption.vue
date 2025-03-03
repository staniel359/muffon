<template>
  <BaseFavoriteDeleteOption
    v-if="favoriteId"
    model="video"
    :favorite-id="favoriteId"
  />
  <AddOption
    v-else
    :video-data="videoData"
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
    videoData: Object
  }
}
</script>

<style lang="sass" scoped></style>
