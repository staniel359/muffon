<template>
  <BaseBookmarkDeleteOption
    v-if="bookmarkId"
    model="track"
    :bookmark-id="bookmarkId"
  />
  <AddOption
    v-else
    :track-data="trackData"
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
    trackData: Object
  }
}
</script>

<style lang="sass" scoped></style>
