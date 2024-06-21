<template>
  <BasePageContainer
    :response-data="savedTracksData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :saved-tracks-data="savedTracksData"
      :response-page-limit="responsePageLimit"
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

export default {
  name: 'BaseSavedTracksPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
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
        query: this.query
      }
    },
    responsePageLimit () {
      return this.savedTracksData?.tracks?.length
    }
  },
  watch: {
    savedTracksData:
      'handleNavigationDataChange'
  },
  mounted () {
    this.getData()
  },
  methods: {
    getSavedTracks,
    getData () {
      this.getSavedTracks(
        this.savedTracksArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
