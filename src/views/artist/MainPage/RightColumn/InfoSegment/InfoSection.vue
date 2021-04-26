<template>
  <BaseHeader
    tag="h1"
    :text="artistName"
  />

  <BaseArtistTags
    v-if="tags"
    :tags="tags"
    :artistName="artistName"
    isMore
  />

  <BaseCounters
    :listenersCount="listenersCount"
    :playsCount="playsCount"
  />

  <template v-if="description">
    <BaseDivider />

    <BaseArtistDescription
      :description="description"
      :artistName="artistName"
      isMore
    />
  </template>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import BaseArtistTags from '@/models/artist/BaseArtistTags.vue'
import BaseCounters from '@/BaseCounters.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseArtistDescription from '@/models/artist/BaseArtistDescription.vue'

export default {
  name: 'InfoSection',
  components: {
    BaseHeader,
    BaseArtistTags,
    BaseCounters,
    BaseDivider,
    BaseArtistDescription
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    artistName () {
      return this.artistData.name
    },
    tags () {
      return this.artistData.tags
    },
    listenersCount () {
      return this.artistData.listeners_count
    },
    playsCount () {
      return this.artistData.plays_count
    },
    description () {
      return this.artistData.description
    }
  }
}
</script>

<style lang="sass" scoped>
.main-header
  margin-bottom: 15px !important
  line-height: 1
</style>
