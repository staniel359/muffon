<template>
  <BasePaginatedPageContainer
    ref="page"
    model="savedTrack"
    :response-data="tracksData"
    :scope="scope"
    :limit="limit"
    :order="order"
    :response-page-limit="totalCount"
    :is-get-data="false"
    is-with-top-segment
    is-with-order-change
  >
    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :profile-id="profileId"
        :is-with-self-icons="false"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-with-duration
        is-with-source
        is-with-created
        is-with-source-option
        is-with-playlist-option
        is-with-share-option
        is-with-queue-option
        is-with-delete-option
      />
    </template>
  </BasePaginatedPageContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import electronStore from '#/plugins/electronStore'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import navigationMixin from '@/mixins/navigationMixin'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import {
  savedTracks as formatSavedTracksPageNavigation
} from '@/helpers/formatters/navigation'
import formatSavedTracksPageTab from '@/helpers/formatters/tabs/savedTracks'
import {
  sortByCreated
} from '@/helpers/utils'

export default {
  name: 'SavedTracksPage',
  components: {
    BasePaginatedPageContainer,
    BaseTracksSimpleList
  },
  mixins: [
    navigationMixin,
    orderChangeMixin
  ],
  data () {
    return {
      limit: 50,
      scope: 'tracks',
      order: 'createdDesc'
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
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
        tracks: this.tracksCreatedSorted
      }
    },
    tracksCreatedSorted () {
      return sortByCreated(
        {
          collection: this.tracks,
          order: this.order
        }
      )
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
  watch: {
    order: 'handleOrderChange'
  },
  mounted () {
    this.setNavigation()

    this.isRefreshNavigation = true
  },
  methods: {
    handleOrderChange () {
      this.reset()
    },
    reset () {
      this.$refs
        .page
        .reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
