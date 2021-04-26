<template>
  <div
    class="search-tab-container"
    ref="tab"
    :class="{
      loading: isActive && isLoading,
      inverted: isDarkMode
    }"
  >
    <BasePaginatedContainer
      :error="error"
      :responseData="searchData"
      :scope="tabData.scope"
      :clientPageLimit="tabData.clientPageLimit"
      :responsePageLimit="tabData.responsePageLimit"
      @fetchData="fetchData"
      @focus="handleFocus"
      @refresh="handleRefresh"
    >
      <template #default="slotProps">
        <component
          :is="tabData.component"
          :[tabData.scope]="slotProps[tabData.scope]"
          :isWithListenersCount="tabData.isWithListenersCount"
          isWithArtistName
          @linkClick="handleLinkClick"
        />
      </template>
    </BasePaginatedContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'
import BaseArtistsSimpleList from '@/lists/artists/BaseArtistsSimpleList.vue'
import BaseAlbumsSimpleList from '@/lists/albums/BaseAlbumsSimpleList.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import fetchSearchData from '#/actions/api/search/fetchData'

export default {
  name: 'BaseSearchTabContainer',
  components: {
    BasePaginatedContainer,
    BaseArtistsSimpleList,
    BaseAlbumsSimpleList,
    BaseTracksSimpleList
  },
  inject: [
    'hideSearch'
  ],
  props: {
    query: {
      type: String,
      required: true
    },
    tabData: {
      type: Object,
      required: true
    },
    isActive: Boolean
  },
  data () {
    return {
      isLoading: false,
      error: null,
      searchData: null
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    searchDataArgs () {
      return {
        query: this.query,
        scope: this.tabData.scope,
        limit: this.tabData.responsePageLimit
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleFocus () {
      this.$refs.tab.scrollTo(0, 0)
    },
    handleRefresh (page) {
      this.error = null

      this.fetchData(page)
    },
    handleLinkClick () {
      this.hideSearch()
    },
    fetchSearchData,
    fetchData (page) {
      this.fetchSearchData({
        ...this.searchDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.search-tab-container
  @extend .flex-full, .relative, .overflow-y-auto, .scroll-smooth

.paginated-container
  @extend .absolute, .w-100
</style>
