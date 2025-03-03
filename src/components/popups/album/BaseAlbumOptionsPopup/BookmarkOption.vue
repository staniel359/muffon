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
    albumData: Object
  }
}
</script>

<style lang="sass" scoped></style>
