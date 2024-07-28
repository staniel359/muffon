<template>
  <BaseTagTabContainer
    :scope="scope"
    :limit="limit"
    :tag-name="tagName"
    :is-active="isActive"
    is-with-top-section
    is-with-play-button
    @focus="handleFocus"
  >
    <template
      #topPlayButton
    >
      <BaseTagTracksPlayButton
        limit-name="default"
        :tag-name="tagName"
      />
    </template>

    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        is-with-artist-name
        is-with-artist-image
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
  </BaseTagTabContainer>
</template>

<script>
import BaseTagTabContainer
  from '@/components/containers/tabs/tag/BaseTagTabContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseTagTracksPlayButton
  from '@/components/buttons/play/tag/BaseTagTracksPlayButton.vue'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'TracksTab',
  components: {
    BaseTagTabContainer,
    BaseTracksSimpleList,
    BaseTagTracksPlayButton
  },
  mixins: [
    tabMixin
  ],
  props: {
    tagName: String
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
