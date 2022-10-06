<template>
  <div>
    <div class="main-labels-section">
      <BaseCounterLabelsSection
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
import BaseCounterLabelsSection
  from '@/components/sections/BaseCounterLabelsSection.vue'
import BaseArtistTags from '@/components/models/artist/BaseArtistTags.vue'

export default {
  name: 'LabelsSection',
  components: {
    BaseCounterLabelsSection,
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
