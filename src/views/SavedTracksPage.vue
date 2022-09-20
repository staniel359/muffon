<template>
  <BasePaginatedPageContainer
    :response-data="tracksData"
    :scope="scope"
    :limit="limit"
    :response-page-limit="totalCount"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :is-with-self-icons="false"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-with-duration
        is-with-source
        is-saved-track
        is-with-playlist-option
        is-with-share-option
        is-with-queue-option
        is-with-delete-option
      />
    </template>
  </BasePaginatedPageContainer>
</template>

<script>
import electronStore from '@/plugins/electronStore'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import navigationMixin from '@/mixins/navigationMixin'
import {
  savedTracks as formatSavedTracksPageNavigation
} from '@/helpers/formatters/navigation'
import formatSavedTracksPageTab from '@/helpers/formatters/tabs/savedTracks'

export default {
  name: 'SavedTracksPage',
  components: {
    BasePaginatedPageContainer,
    BaseTracksSimpleList
  },
  mixins: [
    navigationMixin
  ],
  data () {
    return {
      limit: 50,
      scope: 'tracks'
    }
  },
  computed: {
    navigationSections () {
      return formatSavedTracksPageNavigation()
    },
    tabData () {
      return formatSavedTracksPageTab()
    },
    tracksData () {
      return {
        page: 1,
        total_pages: 1,
        tracks: this.tracks
      }
    },
    tracks () {
      return electronStore.get(
        'profile.savedTracks'
      )
    },
    totalCount () {
      return this.tracks.length
    }
  },
  mounted () {
    this.setNavigation()
  }
}
</script>

<style lang="sass" scoped></style>
