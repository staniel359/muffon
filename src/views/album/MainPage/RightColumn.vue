<template>
  <div class="album-page-right-column">
    <InfoSection
      :albumData="albumData"
      :requestAlbumData="requestAlbumData"
    />

    <BaseDivider />

    <TracksList
      v-if="tracks"
      :albumData="albumData"
      :profileId="profileId"
    />
  </div>
</template>

<script>
import InfoSection from './RightColumn/InfoSection.vue'
import BaseDivider from '@/BaseDivider.vue'
import TracksList from './RightColumn/TracksList.vue'

export default {
  name: 'RightColumn',
  components: {
    InfoSection,
    BaseDivider,
    TracksList
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    requestAlbumData: Object,
    profileId: String
  },
  computed: {
    tracks () {
      return this.albumData.tracks
    }
  }
}
</script>

<style lang="sass" scoped>
.album-page-right-column
  @extend .flex-full
  margin-left: 1em
</style>
