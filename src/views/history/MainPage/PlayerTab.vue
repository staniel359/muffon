<template>
  <BaseHistoryTabContainer
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :is-get-data="!!profileId"
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
        is-with-queue-option
        is-with-playlist-option
        is-with-share-option
        is-with-created
      />
    </template>
  </BaseHistoryTabContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
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
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    )
  }
}
</script>

<style lang="sass" scoped></style>
