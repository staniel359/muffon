<template>
  <div class="ui horizontal card track-card">
    <div></div>
    <BaseImage
      class="track-image"
      :image="image"
    />

    <div class="content">
      <TrackMainInfo
        :trackTitle="trackTitle"
        :artistName="artistName"
        :albumTitle="albumTitle"
      />

      <TrackPlayerPanel :trackData="trackData" />
    </div>
    <div></div>
  </div>
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import TrackMainInfo from './MainSection/TrackMainInfo.vue'
import TrackPlayerPanel from './MainSection/TrackPlayerPanel.vue'

export default {
  name: 'MainSection',
  components: {
    BaseImage,
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
.track-card
  @extend .w-100
  .content
    @extend .no-padding, .d-flex, .flex-column, .no-border

.track-image
  border-right: $border
  height: 150px
</style>
