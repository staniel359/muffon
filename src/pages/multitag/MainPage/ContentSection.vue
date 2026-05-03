<template>
  <BasePaginatedPageContainer
    ref="pagination"
    :response-data="multitagData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    :limit="limit"
    :view-id="viewId"
    :order="order"
    :model="model"
    :is-with-order-change="isWithOrderChange"
    :is-with-view-change="isWithViewChange"
    :is-with-reload-button="isAnyTags"
    is-with-top-segment
  >
    <template
      #top
    >
      <FilterSection
        :scope="scope"
        :tags="tags"
      />
    </template>

    <template
      #topExtra
    >
      <FilterTagsSection
        v-if="isAnyTags"
        :tags="tags"
      />
    </template>

    <template
      #default="slotProps"
    >
      <Component
        :is="listComponent"
        :[scope]="slotProps[scope]"
        :view-id="viewId"
        is-with-artist-image
        is-with-artist-name
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BasePaginatedPageContainer>
</template>

<script>
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import FilterSection from './ContentSection/FilterSection.vue'
import FilterTagsSection from './ContentSection/FilterTagsSection.vue'
import BaseArtistsList from '@/components/lists/artists/BaseArtistsList.vue'
import BaseAlbumsList from '@/components/lists/albums/BaseAlbumsList.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'

import viewChangeMixin from '@/mixins/viewChangeMixin'
import collectionMixin from '@/mixins/collectionMixin'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'
import orderChangeMixin from '@/mixins/orderChangeMixin'

import getMultitag from '@/helpers/actions/api/multitag/get'

export default {
  name: 'ContentSection',
  components: {
    BasePaginatedPageContainer,
    FilterSection,
    FilterTagsSection,
    BaseArtistsList,
    BaseAlbumsList,
    BaseTracksSimpleList
  },
  mixins: [
    viewChangeMixin,
    collectionMixin,
    paginatedPageMixin,
    orderChangeMixin
  ],
  provide () {
    return {
      getData: this.getData,
      setScope: this.setScope,
      clearTags: this.clearTags
    }
  },
  data () {
    return {
      multitagData: null,
      error: null,
      isLoading: false,
      scope: 'artists',
      tags: [],
      listComponentsData: {
        artists: 'BaseArtistsList',
        albums: 'BaseAlbumsList',
        tracks: 'BaseTracksSimpleList'
      },
      order: 'listenersCountDesc',
      scopesModelsData: {
        artists: 'artist',
        albums: 'album',
        tracks: 'track'
      },
      viewChangeScopes: [
        'artists',
        'albums'
      ],
      scopesViewsData: {
        artists: 'table',
        albums: 'table',
        tracks: 'simple'
      }
    }
  },
  computed: {
    multitagArgs () {
      return {
        tags: this.tagsFormatted,
        scope: this.scope,
        limit: this.limit,
        order: this.order
      }
    },
    tagsFormatted () {
      return this.tags.map(
        this.formatTag
      )
    },
    isWithOrderChange () {
      return !!this.multitagData
    },
    isWithViewChange () {
      return !!this.multitagData && this.canChangeView
    },
    canChangeView () {
      return this.viewChangeScopes.includes(
        this.scope
      )
    },
    listComponent () {
      return this.listComponentsData[this.scope]
    },
    isAnyTags () {
      return !!this.tags.length
    },
    model () {
      return this.scopesModelsData[this.scope]
    }
  },
  watch: {
    tags: 'handleTagsChange',
    scope: 'handleScopeChange'
  },
  methods: {
    getMultitag,
    handleTagsChange (
      value
    ) {
      if (value.length) {
        this.refresh()
      } else {
        this.multitagData = null

        this.reset()
      }
    },
    handleScopeChange (
      value
    ) {
      const viewId = this.scopesViewsData[value]

      this.setViewId(
        viewId
      )

      this.defaultViewId = viewId

      if (this.isAnyTags) {
        this.multitagData = null

        this.resetViewId()

        this.refresh()
      }
    },
    getData (
      {
        page
      } = {}
    ) {
      if (!this.isAnyTags) { return }

      this.getMultitag(
        {
          ...this.multitagArgs,
          page
        }
      )
    },
    setScope (
      value
    ) {
      this.scope = value
    },
    clearTags () {
      this.tags = []
    },
    formatTag (
      tagData
    ) {
      return tagData.name
    }
  }
}
</script>

<style lang="sass" scoped></style>
