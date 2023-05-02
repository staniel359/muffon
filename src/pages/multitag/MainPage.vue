<template>
  <div class="main-page-container">
    <BasePaginatedPageContainer
      ref="pagination"
      :response-data="multitagData"
      :is-loading="isLoading"
      :error="error"
      :scope="scope"
      :limit="limit"
      :view-id="viewId"
      :is-with-view-change="isWithViewChange"
      is-with-top-segment
    >
      <template
        #topExtra
      >
        <FilterSection
          :class="{
            'filter-section': isWithViewChange
          }"
          :scope="scope"
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
  </div>
</template>

<script>
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import FilterSection from './MainPage/FilterSection.vue'
import BaseArtistsList from '@/components/lists/artists/BaseArtistsList.vue'
import BaseAlbumsList from '@/components/lists/albums/BaseAlbumsList.vue'
import navigationMixin from '@/mixins/navigationMixin'
import viewChangeMixin from '@/mixins/viewChangeMixin'
import collectionMixin from '@/mixins/collectionMixin'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'
import {
  multitag as formatMultitagPageNavigation
} from '@/helpers/formatters/navigation'
import formatMultitagPageTab from '@/helpers/formatters/tabs/multitag'
import getMultitag from '@/helpers/actions/api/multitag/get'

export default {
  name: 'MainPage',
  components: {
    BasePaginatedPageContainer,
    FilterSection,
    BaseArtistsList,
    BaseAlbumsList
  },
  mixins: [
    navigationMixin,
    viewChangeMixin,
    collectionMixin,
    paginatedPageMixin
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
        albums: 'BaseAlbumsList'
      }
    }
  },
  computed: {
    navigationSections () {
      return formatMultitagPageNavigation()
    },
    tabData () {
      return formatMultitagPageTab()
    },
    multitagArgs () {
      return {
        tags: this.tagsFormatted,
        scope: this.scope,
        limit: this.limit
      }
    },
    tagsFormatted () {
      return this.tags.map(
        this.formatTag
      )
    },
    isWithViewChange () {
      return !!this.multitagData
    },
    listComponent () {
      return this.listComponentsData[
        this.scope
      ]
    }
  },
  watch: {
    tags: 'handleTagsChange',
    scope: 'handleScopeChange'
  },
  mounted () {
    this.setNavigation()

    this.isRefreshNavigation = true
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
    handleScopeChange () {
      if (this.tags.length) {
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

<style lang="sass" scoped>
.filter-section
  margin-top: 1em
</style>
