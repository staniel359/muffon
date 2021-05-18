<template>
  <div class="artist-info-data">
    <ArtistHeader :artistName="artistName" />

    <BaseCounters
      :listenersCount="listenersCount"
      :playsCount="playsCount"
    />

    <BaseArtistTags
      v-if="tags"
      :tags="tags"
      :artistName="artistName"
      :isMore="isMoreTags"
    />

    <template v-if="description">
      <BaseDivider />

      <BaseArtistDescription
        :description="description"
        :artistName="artistName"
        :isMore="isMoreDescription"
      />
    </template>
  </div>
</template>

<script>
import ArtistHeader from './InfoBlock/ArtistHeader.vue'
import BaseCounters from '@/BaseCounters.vue'
import BaseArtistTags from '@/models/artist/BaseArtistTags.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseArtistDescription from '@/models/artist/BaseArtistDescription.vue'

export default {
  name: 'InfoBlock',
  components: {
    ArtistHeader,
    BaseCounters,
    BaseArtistTags,
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
    listenersCount () {
      return this.artistData.listeners_count
    },
    playsCount () {
      return this.artistData.plays_count
    },
    tags () {
      return this.artistData.tags
    },
    isMoreTags () {
      return this.artistData.with_more.tags
    },
    description () {
      return this.artistData.description
    },
    isMoreDescription () {
      return this.artistData.with_more.description
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-info-data
  @extend .flex-full
</style>
