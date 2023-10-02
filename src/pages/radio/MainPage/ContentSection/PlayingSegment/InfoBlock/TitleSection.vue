<template>
  <div class="header">
    <BaseTrackLinkContainer
      class="main-link"
      :track-data="trackData"
    >
      {{ trackTitle }}
    </BaseTrackLinkContainer>
  </div>
</template>

<script>
import BaseTrackLinkContainer
  from '@/components/containers/links/track/BaseTrackLinkContainer.vue'

export default {
  name: 'TitleSection',
  components: {
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
