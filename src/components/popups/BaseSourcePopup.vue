<template>
  <BaseSegmentContainer
    class="main-popup-content-container"
  >
    <span
      v-html="popupText"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import sources from '@/helpers/data/sources'

export default {
  name: 'BaseSourcePopup',
  components: {
    BaseSegmentContainer
  },
  props: {
    source: {
      type: String,
      required: true
    }
  },
  computed: {
    popupText () {
      return this.$t(
        'track.source',
        {
          source: this.sourceNameStrong
        }
      )
    },
    sourceNameStrong () {
      return `<strong>${this.sourceName}</strong>`
    },
    sourceName () {
      return this.sourceData?.name
    },
    sourceData () {
      return sources.find(
        this.isMatchedSource
      )
    }
  },
  methods: {
    isMatchedSource (
      sourceData
    ) {
      return (
        sourceData.id ===
          this.source
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
