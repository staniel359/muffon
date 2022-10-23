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

    <span
      v-if="trackExtraTitle"
      class="sub header main-extra-title-inline"
    >
      <strong
        v-text="trackExtraTitle"
      />
    </span>
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

<style lang="sass" scoped></style>
