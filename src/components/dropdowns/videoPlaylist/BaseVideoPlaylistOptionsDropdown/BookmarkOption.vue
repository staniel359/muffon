<template>
  <BaseBookmarkDeleteOption
    v-if="bookmarkId"
    model="videoPlaylist"
    :bookmark-id="bookmarkId"
  />
  <AddOption
    v-else
    :playlist-data="playlistData"
  />
</template>

<script>
import BaseBookmarkDeleteOption
  from '@/components/dropdowns/options/bookmark/BaseBookmarkDeleteOption.vue'
import AddOption from './BookmarkOption/AddOption.vue'

export default {
  name: 'BookmarkOption',
  components: {
    BaseBookmarkDeleteOption,
    AddOption
  },
  props: {
    bookmarkId: String,
    playlistData: Object
  }
}
</script>

<style lang="sass" scoped></style>
