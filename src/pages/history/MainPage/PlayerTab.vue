<template>
  <BaseHistoryTabContainer
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[listScope]"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-with-duration
        is-with-source
        is-with-source-option
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-playlist-option
        is-with-queue-option
        is-with-save-option
        is-with-share-option
        is-with-external-link-option
        is-with-created
      />
    </template>
  </BaseHistoryTabContainer>
</template>

<script>
import BaseHistoryTabContainer
  from '@/components/containers/tabs/history/BaseHistoryTabContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'PlayerTab',
  components: {
    BaseHistoryTabContainer,
    BaseTracksSimpleList
  },
  mixins: [
    tabMixin
  ],
  data () {
    return {
      limit:
        tracksLimits.simple.small,
      scope: 'player',
      listScope: 'tracks'
    }
  }
}
</script>

<style lang="sass" scoped></style>
