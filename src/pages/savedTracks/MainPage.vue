<template>
  <BasePaginatedPageContainer
    ref="pagination"
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
  ipcRenderer
} from 'electron'
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import navigationMixin from '@/mixins/navigationMixin'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'
import {
  savedTracks as formatSavedTracksPageNavigation
} from '@/helpers/formatters/navigation'
import formatSavedTracksPageTab from '@/helpers/formatters/tabs/savedTracks'
import {
  sortByCreated
} from '@/helpers/utils'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'

export default {
  name: 'MainPage',
  components: {
    BasePaginatedPageContainer,
    BaseTracksSimpleList
  },
  mixins: [
    navigationMixin,
    orderChangeMixin,
    paginatedPageMixin
  ],
  data () {
    return {
      tracksData: null,
      limit:
        tracksLimits.simple.large,
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
    totalCount () {
      return this.tracksData?.tracks?.length
    }
  },
  watch: {
    order: 'handleOrderChange'
  },
  async mounted () {
    this.tracksData =
      await this.getTracksData()

    this.setNavigation()

    this.isRefreshNavigation = true
  },
  methods: {
    async handleOrderChange () {
      this.reset()

      this.tracksData =
        await this.getTracksData()
    },
    async getTracksData () {
      const tracks =
        await this.getTracksCreatedSorted()

      return {
        page: 1,
        total_pages: 1,
        tracks
      }
    },
    async getTracksCreatedSorted () {
      const collection =
        await this.getTracks()

      return sortByCreated(
        {
          collection,
          order: this.order
        }
      )
    },
    getTracks () {
      return ipcRenderer.invoke(
        'get-electron-store-key',
        'profile.savedTracks'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
