<template>
  <BaseHeaderContainer
    class="playing-header"
    tag="h3"
  >
    <BaseTrackLinkContainer
      class="main-link"
      :track-data="trackData"
    >
      {{ trackTitle }}
    </BaseTrackLinkContainer>

    <span
      v-if="trackExtraTitle"
      :class="[
        'sub header description',
        'main-extra-title playing-header'
      ]"
      v-text="trackExtraTitle"
    />
  </BaseHeaderContainer>
</template>

<script>
import BaseHeaderContainer
  from '@/components/containers/BaseHeaderContainer.vue'
import BaseTrackLinkContainer
  from '@/components/containers/links/track/BaseTrackLinkContainer.vue'

export default {
  name: 'TitleSection',
  components: {
    BaseHeaderContainer,
    BaseTrackLinkContainer
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    trackTitle () {
      return this.trackData.title
    },
    trackExtraTitle () {
      return this.trackData.extra_title
    }
  }
}
</script>

<style lang="sass" scoped>
.playing-header
  line-height: 1.3em !important
</style>
