<template>
  <BaseBookmarkDeleteOption
    v-if="bookmarkId"
    model="album"
    :bookmark-id="bookmarkId"
  />
  <AddOption
    v-else
    :artist-name="artistName"
    :album-title="albumTitle"
    :image-url="imageUrl"
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
    artistName: String,
    albumTitle: String,
    imageUrl: String
  }
}
</script>

<style lang="sass" scoped></style>
