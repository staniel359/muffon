<template>
  <BaseArtistTabContainer
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :artist-name="slotProps.artistName"
        :top-track-count="slotProps.topTrackCount"
        is-with-listeners-count
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
  </BaseArtistTabContainer>
</template>

<script>
import BaseArtistTabContainer
  from '@/components/containers/tabs/artist/BaseArtistTabContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'TracksTab',
  components: {
    BaseArtistTabContainer,
    BaseTracksSimpleList
  },
  mixins: [
    tabMixin
  ],
  props: {
    artistName: String
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
