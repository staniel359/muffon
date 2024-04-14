<template>
  <TheMediaKeysObserver />

  <ThePlayerObserver
    v-if="isRenderPlayerObserver"
  />

  <TheBackground />

  <TheNavbarPanel />

  <TheSearchPanel />

  <TheSidebarPanel />

  <TheQueuePanel />

  <ThePlayerVariantsPanel />

  <TheVisibleArea />

  <TheScrollToTopButton
    :key="key"
  />

  <TheDonateModal />

  <div class="pusher">
    <TheLoaderDimmer />

    <TheView
      ref="view"
    />
  </div>
</template>

<script>
import {
  defineAsyncComponent
} from 'vue'
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import playerStore from '@/stores/player'
import TheMediaKeysObserver
  from '@/components/layout/observers/TheMediaKeysObserver.vue'
import TheBackground from '@/components/layout/TheBackground.vue'
import TheNavbarPanel from '@/components/layout/panels/TheNavbarPanel.vue'
import TheSearchPanel from '@/components/layout/panels/TheSearchPanel.vue'
import TheSidebarPanel from '@/components/layout/panels/TheSidebarPanel.vue'
import TheQueuePanel from '@/components/layout/panels/TheQueuePanel.vue'
import ThePlayerVariantsPanel
  from '@/components/layout/panels/ThePlayerVariantsPanel.vue'
import TheVisibleArea from '@/components/layout/TheVisibleArea.vue'
import TheScrollToTopButton from '@/components/layout/TheScrollToTopButton.vue'
import TheDonateModal from '@/components/layout/modals/TheDonateModal.vue'
import TheLoaderDimmer from '@/components/layout/TheLoaderDimmer.vue'
import TheView from '@/components/layout/TheView.vue'
import {
  generateKey
} from '@/helpers/utils'

const ThePlayerObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/ThePlayerObserver.vue'
    )
  )

export default {
  name: 'DefaultPageLayout',
  components: {
    TheMediaKeysObserver,
    ThePlayerObserver,
    TheBackground,
    TheNavbarPanel,
    TheSearchPanel,
    TheSidebarPanel,
    TheQueuePanel,
    ThePlayerVariantsPanel,
    TheVisibleArea,
    TheScrollToTopButton,
    TheDonateModal,
    TheLoaderDimmer,
    TheView
  },
  provide () {
    return {
      refreshPage: this.refreshPage
    }
  },
  data () {
    return {
      key: null
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id',
        isProfileAnonymous: 'isAnonymous'
      }
    ),
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    isRenderPlayerObserver () {
      return (
        this.isLoggedIn &&
          this.playerPlaying
      )
    },
    isLoggedIn () {
      return (
        this.profileId ||
          this.isProfileAnonymous
      )
    }
  },
  watch: {
    $route: 'handleRouteChange'
  },
  methods: {
    handleRouteChange () {
      this.key = generateKey()
    },
    refreshPage () {
      this.$refs
        .view
        .refresh()

      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
