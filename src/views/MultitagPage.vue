<template>
  <BasePaginatedPageContainer
    ref="page"
    :response-data="multitagData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    :limit="limit"
    :view-index="viewIndex"
    :is-with-view-change="isWithViewChange"
    is-with-top-segment
  >
    <template #top>
      <FilterBlock
        :scope="scope"
        :tags="tags"
      />
    </template>

    <template #default="slotProps">
      <BaseArtistsList
        :artists="slotProps[scope]"
        :view-index="viewIndex"
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BasePaginatedPageContainer>
</template>

<script>
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'
import FilterBlock from './MultitagPage/FilterBlock.vue'
import BaseArtistsList from '*/components/lists/artists/BaseArtistsList.vue'
import navigationMixin from '*/mixins/navigationMixin'
import viewChangeMixin from '*/mixins/viewChangeMixin'
import collectionMixin from '*/mixins/collectionMixin'
import {
  multitag as formatMultitagPageNavigation
} from '*/helpers/formatters/navigation'
import formatMultitagPageTab from '*/helpers/formatters/tabs/multitag'
import getMultitag from '*/helpers/actions/api/multitag/get'

export default {
  name: 'MultitagPage',
  components: {
    BasePaginatedPageContainer,
    FilterBlock,
    BaseArtistsList
  },
  mixins: [
    navigationMixin,
    viewChangeMixin,
    collectionMixin
  ],
  provide () {
    return {
      getData: this.getData,
      setScope: this.setScope,
      reset: this.reset
    }
  },
  data () {
    return {
      multitagData: null,
      error: null,
      isLoading: false,
      scope: 'artists',
      tags: []
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
    }
  },
  watch: {
    tags: 'handleTagsChange'
  },
  mounted () {
    this.setNavigation()
  },
  methods: {
    getMultitag,
    handleTagsChange (
      value
    ) {
      this.resetPage()

      if (value.length) {
        this.getData()
      } else {
        this.multitagData = null
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
    reset () {
      this.tags = []
    },
    formatTag (
      tagData
    ) {
      return tagData.name
    },
    resetPage () {
      this.$refs
        .page
        .reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>
