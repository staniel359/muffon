<template>
  <div
    ref="scrollable"
    class="scrollable absolute"
  />

  <div
    class="the-scroll-to-top-button fixed main-bottom-right-small-button"
    :class="{
      'player-panel-bottom': playerPlaying
    }"
  >
    <BaseTransitionContainer
      v-if="scrollable"
      :scrollable="scrollable"
    >
      <BaseButton
        class="basic circular compact inverted"
        icon="arrowUp"
        @click="handleClick"
      />
    </BaseTransitionContainer>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseTransitionContainer
  from '@/components/containers/BaseTransitionContainer.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'TheScrollToTopButton',
  components: {
    BaseTransitionContainer,
    BaseButton
  },
  data () {
    return {
      scrollable: null
    }
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    )
  },
  mounted () {
    this.scrollable =
      this.$refs.scrollable
  },
  methods: {
    handleClick () {
      this.scrollToTop()
    },
    scrollToTop () {
      window.scrollTo(
        0,
        0
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.scrollable
  top: 20px

.the-scroll-to-top-button
  z-index: 10
  transition: bottom 0.5s
</style>
