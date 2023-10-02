<template>
  <BaseCounterLabelsSection
    size=""
    :counters="counters"
  />

  <BaseArtistInnerCounterLabelsSection
    size=""
    :artist-data="artistData"
    :is-clickable="false"
  />

  <BaseArtistTags
    size=""
    :artist-data="artistData"
    :is-with-more="false"
    @link-click="handleLinkClick"
  />
</template>

<script>
import BaseCounterLabelsSection
  from '@/components/sections/BaseCounterLabelsSection.vue'
import BaseArtistInnerCounterLabelsSection
  from '@/components/sections/artist/BaseArtistInnerCounterLabelsSection.vue'
import BaseArtistTags from '@/components/models/artist/BaseArtistTags.vue'

export default {
  name: 'LabelsSection',
  components: {
    BaseCounterLabelsSection,
    BaseArtistInnerCounterLabelsSection,
    BaseArtistTags
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'linkClick'
  ],
  computed: {
    counters () {
      return [
        {
          scope: 'listeners',
          count: this.listenersCount
        },
        {
          scope: 'plays',
          count: this.playsCount
        }
      ]
    },
    listenersCount () {
      return this.artistData.listeners_count
    },
    playsCount () {
      return this.artistData.plays_count
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
