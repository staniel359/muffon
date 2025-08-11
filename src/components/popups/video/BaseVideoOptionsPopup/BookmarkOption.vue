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
    videoData: Object
  }
}
</script>

<style lang="sass" scoped></style>
