<template>
  <div
    class="main-profile-page-left-column main-sticky-container"
  >
    <InfoSegment
      :tag-data="tagData"
    />
  </div>
</template>

<script>
import InfoSegment from './LeftColumn/InfoSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    InfoSegment
  },
  props: {
    tagData: Object
  }
}
</script>

<style lang="sass" scoped></style>
