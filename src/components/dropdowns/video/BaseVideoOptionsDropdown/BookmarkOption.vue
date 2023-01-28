<template>
  <BaseBookmarkDeleteOption
    v-if="bookmarkId"
    model="video"
    :bookmark-id="bookmarkId"
  />
  <AddOption
    v-else
    :video-data="videoData"
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
    videoData: Object
  }
}
</script>

<style lang="sass" scoped></style>
