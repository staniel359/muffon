<template>
  <div>
    <h1 class="ui header main-header">
      {{ artistName }}
    </h1>

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
import BaseArtistTags from '@/models/artist/BaseArtistTags.vue'
import BaseCounters from '@/BaseCounters.vue'
import BaseArtistDescription from '@/models/artist/BaseArtistDescription.vue'

export default {
  name: 'InfoSection',
  components: {
    BaseArtistTags,
    BaseCounters,
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
