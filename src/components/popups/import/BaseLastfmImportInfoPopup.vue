<template>
  <BaseSegmentContainer
    class="main-popup-content-container"
  >
    <div
      v-text="historyVisibleText"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'

export default {
  name: 'BaseLastfmImportInfoPopup',
  components: {
    BaseSegmentContainer
  },
  computed: {
    historyVisibleText () {
      return this.$t(
        'import.lastfm.historyVisible'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
