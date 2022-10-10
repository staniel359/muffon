<template>
  <LyricAnnotationItem
    v-if="annotationId"
    :lyric-data="lyricData"
  />
  <span
    v-else
    v-text="lyricData"
  />
</template>

<script>
import LyricAnnotationItem from './LyricItem/LyricAnnotationItem.vue'

export default {
  name: 'LyricItem',
  components: {
    LyricAnnotationItem
  },
  props: {
    lyricData: {
      type: [
        String,
        Object
      ],
      required: true
    }
  },
  computed: {
    annotationId () {
      return this.lyricData.annotation_id
    }
  }
}
</script>

<style lang="sass" scoped></style>
