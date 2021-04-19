<template>
  <div class="artist-info-data">
    <ArtistHeader :artistName="artistName" />

    <BaseCounters
      class="artist-counters"
      :listenersCount="listenersCount"
    />

    <BaseArtistTags
      v-if="tags"
      class="artist-tags"
      :tags="tags"
      :artistName="artistName"
      isMore
    />

    <template v-if="description">
      <div class="ui divider main-divider"></div>

      <BaseArtistDescription
        :description="description"
        :artistName="artistName"
        isMore
      />
    </template>
  </div>
</template>

<script>
import ArtistHeader from './InfoBlock/ArtistHeader.vue'
import BaseCounters from '@/BaseCounters.vue'
import BaseArtistTags from '@/models/artist/BaseArtistTags.vue'
import BaseArtistDescription from '@/models/artist/BaseArtistDescription.vue'

export default {
  name: 'InfoBlock',
  components: {
    ArtistHeader,
    BaseCounters,
    BaseArtistTags,
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
    listenersCount () {
      return this.artistData.listeners_count
    },
    tags () {
      return this.artistData.tags
    },
    description () {
      return this.artistData.description
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-info-data
  @extend .flex-full

.artist-counters, ::v-deep(.artist-tags)
  @extend .d-inline
</style>
