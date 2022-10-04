<template>
  <div>
    <div class="main-labels-section">
      <BaseCounterLabels
        :counters="counters"
        size=""
      />
    </div>

    <BaseArtistTags
      class="main-labels-section"
      size=""
      :artist-data="artistData"
      :is-with-more="false"
      @link-click="handleLinkClick"
    />
  </div>
</template>

<script>
import BaseCounterLabels from '@/components/labels/BaseCounterLabels.vue'
import BaseArtistTags from '@/components/models/artist/BaseArtistTags.vue'

export default {
  name: 'LabelsSection',
  components: {
    BaseCounterLabels,
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
