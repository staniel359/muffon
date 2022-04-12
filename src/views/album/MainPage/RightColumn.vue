<template>
  <div class="album-page-right-column">
    <InfoSection
      :albumData="albumData"
      :requestAlbumData="requestAlbumData"
    />

    <BaseDivider />

    <TracksList
      :albumData="albumData"
      :profileId="profileId"
    />
  </div>
</template>

<script>
import InfoSection from './RightColumn/InfoSection.vue'
import BaseDivider from '*/components/BaseDivider.vue'
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
  }
}
</script>

<style lang="sass" scoped>
.album-page-right-column
  @extend .flex-full
  margin-left: 1em
</style>
