<template>
  <div>
    <div class="main-labels-section">
      <BaseCounterLabelsSection
        :counters="counters"
      />
    </div>

    <div
      v-if="releaseDate"
      class="main-labels-section"
    >
      <BaseDateLabelSection
        :date="releaseDate"
      />
    </div>

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
