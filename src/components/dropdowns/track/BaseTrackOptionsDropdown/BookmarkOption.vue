<template>
  <BaseBookmarkDeleteOption
    v-if="bookmarkId"
    model="track"
    :bookmark-id="bookmarkId"
  />
  <AddOption
    v-else
    :artist-name="artistName"
    :track-title="trackTitle"
    :album-title="albumTitle"
    :image-url="imageUrl"
    :source-data="sourceData"
    :audio-data="audioData"
    :album-source-data="albumSourceData"
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
    trackTitle: String,
    albumTitle: String,
    imageUrl: String,
    sourceData: Object,
    audioData: Object,
    albumSourceData: Object
  }
}
</script>

<style lang="sass" scoped></style>
