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
  from '@/components/popups/options/BaseBookmarkDeleteOption.vue'
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
