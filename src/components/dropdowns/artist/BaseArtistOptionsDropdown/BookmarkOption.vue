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
    artistData: Object
  }
}
</script>

<style lang="sass" scoped></style>
