<template>
  <BaseBookmarkDeleteOption
    v-if="bookmarkId"
    model="album"
    :bookmark-id="bookmarkId"
  />
  <AddOption
    v-else
    :album-data="albumData"
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
    albumData: Object
  }
}
</script>

<style lang="sass" scoped></style>
