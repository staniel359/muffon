<template>
  <div class="main-lyrics-container">
    <p class="lyrics">
      <LyricItem
        v-for="(lyricData, index) in lyrics"
        :key="index"
        :lyric-data="lyricData"
      />
    </p>
  </div>
</template>

<script>
import LyricItem from './LyricsSection/LyricItem.vue'

export default {
  name: 'LyricsSection',
  components: {
    LyricItem
  },
  props: {
    lyrics: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
