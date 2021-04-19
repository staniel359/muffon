<template>
  <div class="right-column">
    <InfoSection
      :albumData="albumData"
      :requestAlbumData="requestAlbumData"
    />

    <div class="ui divider main-divider"></div>

    <TracksList
      v-if="tracks"
      :albumData="albumData"
    />
  </div>
</template>

<script>
import InfoSection from './RightColumn/InfoSection.vue'
import TracksList from './RightColumn/TracksList.vue'

export default {
  name: 'RightColumn',
  components: {
    InfoSection,
    TracksList
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    requestAlbumData: Object
  },
  computed: {
    tracks () {
      return this.albumData.tracks
    }
  }
}
</script>

<style lang="sass" scoped>
.right-column
  @extend .flex-full
</style>
