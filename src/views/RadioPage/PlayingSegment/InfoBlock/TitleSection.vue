<template>
  <BaseHeaderContainer
    tag="h3"
    is-inverted
  >
    <BaseTrackLinkContainer
      class="main-link"
      :track-data="trackData"
    >
      {{ trackTitle }}
    </BaseTrackLinkContainer>
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
