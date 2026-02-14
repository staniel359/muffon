<template>
  <BasePageContainer
    :response-data="savedTracksData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :saved-tracks-data="savedTracksData"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import {
  savedTracks as formatSavedTracksPageNavigation
} from '@/helpers/formatters/navigation'
import formatSavedTracksPageTab from '@/helpers/formatters/tabs/savedTracks'
import getSavedTracks from '@/helpers/actions/local/savedTracks/get'
import getSavedTracksSearch
  from '@/helpers/actions/local/savedTracks/search/get'

export default {
  name: 'BaseSavedTracksPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    limit: {
      type: Number,
      required: true
    },
    order: String,
    query: String
  },
  data () {
    return {
      savedTracksData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatSavedTracksPageNavigation()
    },
    tabData () {
      return formatSavedTracksPageTab()
    },
    savedTracksArgs () {
      return {
        order: this.order,
        query: this.query,
        limit: this.limit
      }
    }
  },
  watch: {
    savedTracksData: 'handleNavigationDataChange'
  },
  mounted () {
    this.getData()
  },
  methods: {
    getSavedTracks,
    getSavedTracksSearch,
    getData (
      {
        page
      } = {}
    ) {
      if (this.query) {
        this.getSavedTracksSearch(
          {
            ...this.savedTracksArgs,
            page
          }
        )
      } else {
        this.getSavedTracks(
          {
            ...this.savedTracksArgs,
            page
          }
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
