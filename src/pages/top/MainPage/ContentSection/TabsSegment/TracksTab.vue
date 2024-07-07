<template>
  <BaseTopTabContainer
    :scope="scope"
    :limit="limit"
    :country="country"
    :is-active="isActive"
    is-with-top-section
    is-with-play-button
    @focus="handleFocus"
  >
    <template
      #topPlayButton
    >
      <BaseTopTracksPlayButton
        limit-name="default"
        :country="country"
      />
    </template>

    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        is-with-artist-image
        is-with-artist-name
        is-with-source-option
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-playlist-option
        is-with-queue-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseTopTabContainer>
</template>

<script>
import BaseTopTabContainer
  from '@/components/containers/tabs/top/BaseTopTabContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseTopTracksPlayButton
  from '@/components/buttons/play/top/BaseTopTracksPlayButton.vue'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'TracksTab',
  components: {
    BaseTopTabContainer,
    BaseTracksSimpleList,
    BaseTopTracksPlayButton
  },
  mixins: [
    tabMixin
  ],
  props: {
    country: String
  },
  data () {
    return {
      limit:
        tracksLimits.simple.small,
      scope: 'tracks'
    }
  }
}
</script>

<style lang="sass" scoped></style>
