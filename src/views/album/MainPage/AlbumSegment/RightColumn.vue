<template>
  <div class="main-right-column">
    <InfoSection
      :album-data="albumData"
      :request-album-data="requestAlbumData"
    />

    <BaseDivider />

    <TracksList
      :album-data="albumData"
    />
  </div>
</template>

<script>
import InfoSection from './RightColumn/InfoSection.vue'
import BaseDivider from '@/components/BaseDivider.vue'
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
    requestAlbumData: Object
  }
}
</script>

<style lang="sass" scoped></style>
