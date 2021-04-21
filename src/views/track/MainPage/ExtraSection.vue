<template>
  <div class="ui basic segments main-basic-segment-container">
    <div class="ui segment">
      <BaseCounters
        :listenersCount="listenersCount"
        :playsCount="playsCount"
      />

      <BaseTrackTags
        v-if="tags"
        :tags="tags"
        :artistName="artistName"
        :trackTitle="trackTitle"
        isMore
      />

      <template v-if="description">
        <div class="ui divider main-divider"></div>

        <BaseTrackDescription
          :description="description"
          :artistName="artistName"
          :trackTitle="trackTitle"
          isMore
        />
      </template>
    </div>
  </div>
</template>

<script>
import BaseCounters from '@/BaseCounters.vue'
import BaseTrackTags from '@/models/track/BaseTrackTags.vue'
import BaseTrackDescription from '@/models/track/BaseTrackDescription.vue'

export default {
  name: 'ExtraSection',
  components: {
    BaseCounters,
    BaseTrackTags,
    BaseTrackDescription
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    listenersCount () {
      return this.trackData.listeners_count
    },
    playsCount () {
      return this.trackData.plays_count
    },
    tags () {
      return this.trackData.tags
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    },
    description () {
      return this.trackData.description
    }
  }
}
</script>

<style lang="sass" scoped></style>
