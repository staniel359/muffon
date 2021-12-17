<template>
  <BaseArtistTags
    v-if="tags.length"
    :tags="tags"
    :artistName="artistName"
    :isMore="isMore"
  />
</template>

<script>
import BaseArtistTags from '@/models/artist/BaseArtistTags.vue'

export default {
  name: 'TagsSection',
  components: {
    BaseArtistTags
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    tags () {
      return this.artistData.tags
    },
    artistName () {
      return this.artistData.name
    },
    isMore () {
      return this.artistData.with_more.tags
    }
  }
}
</script>

<style lang="sass" scoped></style>
