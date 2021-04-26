<template>
  <BaseHorizontalCardContainer
    class="track-card"
    :image="image"
  >
    <TrackMainInfo
      :trackTitle="trackTitle"
      :artistName="artistName"
      :albumTitle="albumTitle"
    />

    <TrackPlayerPanel :trackData="trackData" />
  </BaseHorizontalCardContainer>
</template>

<script>
import BaseHorizontalCardContainer
  from '@/containers/BaseHorizontalCardContainer.vue'
import TrackMainInfo from './MainSection/TrackMainInfo.vue'
import TrackPlayerPanel from './MainSection/TrackPlayerPanel.vue'

export default {
  name: 'MainSection',
  components: {
    BaseHorizontalCardContainer,
    TrackMainInfo,
    TrackPlayerPanel
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    image () {
      return this.trackData.image.small
    },
    trackTitle () {
      return this.trackData.title
    },
    artistName () {
      return this.trackData.artist.name
    },
    albumTitle () {
      return this.trackData.album?.title
    }
  }
}
</script>

<style lang="sass" scoped>
::v-deep(.content)
  @extend .no-padding, .flex-column
</style>
