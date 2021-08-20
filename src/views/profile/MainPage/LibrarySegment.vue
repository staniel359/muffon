<template>
  <div class="ui segments main-segment-container">
    <HeaderSegment
      :profileId="profileId"
    />

    <StatisticsSegment
      :profileId="profileId"
    />

    <LibraryTabsSegment
      :profileId="profileId"
    />
  </div>
</template>

<script>
import HeaderSegment from './LibrarySegment/HeaderSegment.vue'
import StatisticsSegment from './LibrarySegment/StatisticsSegment.vue'
import LibraryTabsSegment from './LibrarySegment/LibraryTabsSegment.vue'

export default {
  name: 'LibrarySegment',
  components: {
    HeaderSegment,
    StatisticsSegment,
    LibraryTabsSegment
  },
  props: {
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>
