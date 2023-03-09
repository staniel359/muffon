<template>
  <BaseBookmarkDeleteOption
    v-if="bookmarkId"
    model="videoChannel"
    :bookmark-id="bookmarkId"
  />
  <AddOption
    v-else
    :channel-data="channelData"
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
    channelData: Object
  }
}
</script>

<style lang="sass" scoped></style>
