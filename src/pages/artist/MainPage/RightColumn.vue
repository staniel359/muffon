<template>
  <div class="main-right-column">
    <InfoSegment
      :artist-data="artistData"
    />

    <TabsSegment
      :artist-data="artistData"
    />
  </div>
</template>

<script>
import InfoSegment from './RightColumn/InfoSegment.vue'
import TabsSegment from './RightColumn/TabsSegment.vue'

export default {
  name: 'RightColumn',
  components: {
    InfoSegment,
    TabsSegment
  },
  props: {
    artistData: Object
  }
}
</script>

<style lang="sass" scoped></style>
