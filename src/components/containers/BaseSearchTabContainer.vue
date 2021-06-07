<template>
  <div
    ref="tab"
    :class="{
      loading: isActive && isLoading,
      inverted: isDarkMode
    }"
  >
    <BasePaginatedContainer
      :isLoading="isLoading"
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
        <Component
          :is="tabData.component"
          :[tabData.scope]="slotProps[tabData.scope]"
          :isWithListenersCount="tabData.isWithListenersCount"
          :scrollable="scrollable"
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
      searchData: null,
      error: null,
      isActivated: false,
      isLoading: false
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
    },
    scrollable () {
      return this.$refs.tab
    }
  },
  watch: {
    isActive: {
      immediate: true,
      handler: 'handleIsActive'
    },
    isActivated: {
      immediate: true,
      handler: 'handleIsActivated'
    }
  },
  methods: {
    handleIsActive (value) {
      value && (this.isActivated = true)
    },
    handleIsActivated (value) {
      value && this.fetchData()
    },
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

<style lang="sass" scoped></style>
