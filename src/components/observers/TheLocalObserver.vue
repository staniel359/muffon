<template>
  <div class="the-local-observer"></div>
</template>

<script>
import {
  getIsDarkMode as getIsLocalDarkMode
} from '#/actions/plugins/local/layout'
import {
  getCurrentTrackId as getLocalPlayerCurrentTrackId,
  getCurrentVariantId as getLocalPlayerCurrentVariantId,
  getPlaying as getLocalPlayerPlaying,
  getSourceId as getLocalPlayerSourceId,
  getVariants as getLocalPlayerVariants
} from '#/actions/plugins/local/player'
import {
  getCurrentTrackId as getLocalQueueCurrentTrackId,
  getIsAutoplay as getIsLocalQueueAutoplay,
  getTracks as getLocalQueueTracks
} from '#/actions/plugins/local/queue'

import { setIsDarkMode } from '#/actions/layout'
import {
  setCurrentTrackId as setPlayerCurrentTrackId,
  setCurrentVariantId as setPlayerCurrentVariantId,
  setPlaying as setPlayerPlaying,
  setSourceId as setPlayerSourceId,
  setVariants as setPlayerVariants
} from '#/actions/player'
import {
  setCurrentTrackId as setQueueCurrentTrackId,
  setIsAutoplay as setIsQueueAutoplay,
  setTracks as setQueueTracks
} from '#/actions/queue'

export default {
  name: 'TheLocalObserver',
  mounted () {
    setIsDarkMode(
      getIsLocalDarkMode()
    )

    setPlayerCurrentTrackId(
      getLocalPlayerCurrentTrackId()
    )
    setPlayerCurrentVariantId(
      getLocalPlayerCurrentVariantId()
    )
    setPlayerPlaying(
      getLocalPlayerPlaying(),
      { isAutoplay: false }
    )
    setPlayerSourceId(
      getLocalPlayerSourceId()
    )
    setPlayerVariants(
      getLocalPlayerVariants()
    )

    setQueueCurrentTrackId(
      getLocalQueueCurrentTrackId()
    )
    setIsQueueAutoplay(
      getIsLocalQueueAutoplay()
    )
    setQueueTracks(
      getLocalQueueTracks()
    )
  }
}
</script>

<style lang="sass" scoped></style>
