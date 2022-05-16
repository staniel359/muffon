<template>
  <BaseTickerContainer>
    <BaseHeaderContainer
      tag="h4"
    >
      <BaseTrackLinkContainer
        class="main-link"
        :track-data="playerPlaying"
      >
        {{ trackTitle }}
      </BaseTrackLinkContainer>

      <span
        v-if="trackExtraTitle"
        :class="[
          'sub header description',
          'main-extra-title'
        ]"
        v-text="trackExtraTitle"
      />
    </BaseHeaderContainer>
  </BaseTickerContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseTickerContainer
  from '*/components/containers/BaseTickerContainer.vue'
import BaseHeaderContainer
  from '*/components/containers/BaseHeaderContainer.vue'
import BaseTrackLinkContainer
  from '*/components/containers/links/track/BaseTrackLinkContainer.vue'

export default {
  name: 'TitleSection',
  components: {
    BaseTickerContainer,
    BaseHeaderContainer,
    BaseTrackLinkContainer
  },
  computed: {
    ...mapState(
      'player',
      {
        playerPlaying: 'playing'
      }
    ),
    trackTitle () {
      return this.playerPlaying.title
    },
    trackExtraTitle () {
      return this.playerPlaying.extra_title
    }
  }
}
</script>

<style lang="sass" scoped></style>
