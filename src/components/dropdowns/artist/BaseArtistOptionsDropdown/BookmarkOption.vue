<template>
  <BaseBookmarkDeleteOption
    v-if="bookmarkId"
    model="artist"
    :bookmark-id="bookmarkId"
  />
  <AddOption
    v-else
    :artist-name="artistName"
  />
</template>

<script>
import BaseBookmarkDeleteOption
  from '*/components/dropdowns/options/bookmark/BaseBookmarkDeleteOption.vue'
import AddOption from './BookmarkOption/AddOption.vue'

export default {
  name: 'BookmarkOption',
  components: {
    BaseBookmarkDeleteOption,
    AddOption
  },
  props: {
    bookmarkId: String,
    artistName: String
  }
}
</script>

<style lang="sass" scoped></style>
