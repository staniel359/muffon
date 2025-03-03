<template>
  <BaseBookmarkDeleteOption
    v-if="bookmarkId"
    model="artist"
    :bookmark-id="bookmarkId"
  />
  <AddOption
    v-else
    :artist-data="artistData"
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
    bookmarkId: Number,
    artistData: Object
  }
}
</script>

<style lang="sass" scoped></style>
