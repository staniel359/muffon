<template>
  <div>
    <BaseCounterLabelsSection
      class="main-labels-section"
      :counters="counters"
    />

    <BaseAlbumInnerCounterLabelsSection
      class="main-labels-section"
      :album-data="albumData"
    />

    <BaseDateLabelSection
      class="main-labels-section"
      :date="releaseDate"
    />

    <BaseAlbumLabels
      class="main-labels-section"
      :album-data="albumData"
    />

    <BaseAlbumTags
      class="main-labels-section"
      :album-data="albumData"
      :request-album-data="requestAlbumData"
    />
  </div>

  <BaseAlbumDescription
    :album-data="albumData"
    :request-album-data="requestAlbumData"
  />
</template>

<script>
import BaseCounterLabelsSection
  from '@/components/sections/BaseCounterLabelsSection.vue'
import BaseAlbumInnerCounterLabelsSection
  from '@/components/sections/album/BaseAlbumInnerCounterLabelsSection.vue'
import BaseDateLabelSection
  from '@/components/sections/BaseDateLabelSection.vue'
import BaseAlbumLabels from '@/components/models/album/BaseAlbumLabels.vue'
import BaseAlbumTags from '@/components/models/album/BaseAlbumTags.vue'
import BaseAlbumDescription
  from '@/components/models/album/BaseAlbumDescription.vue'

export default {
  name: 'SecondarySection',
  components: {
    BaseCounterLabelsSection,
    BaseAlbumInnerCounterLabelsSection,
    BaseDateLabelSection,
    BaseAlbumLabels,
    BaseAlbumTags,
    BaseAlbumDescription
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    requestAlbumData: Object
  },
  computed: {
    releaseDate () {
      return this.albumData.release_date
    },
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
      return this.albumData.listeners_count
    },
    playsCount () {
      return this.albumData.plays_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
