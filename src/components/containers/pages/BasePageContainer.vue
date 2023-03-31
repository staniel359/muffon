<template>
  <div class="main-page-container">
    <BaseErrorMessage
      v-if="isPageError"
      :error="error"
      is-page
    />
    <slot
      v-else-if="responseData"
    />
  </div>
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import {
  mapState,
  mapActions
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import {
  toggleLoaderDimmer
} from '@/helpers/actions/layout'
import {
  loading as formatLoadingPageNavigation,
  error as formatErrorPageNavigation
} from '@/helpers/formatters/navigation'

export default {
  name: 'BasePageContainer',
  components: {
    BaseErrorMessage
  },
  props: {
    responseData: Object,
    isLoading: Boolean,
    error: Error
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'tabId'
      ]
    ),
    isPageLoading () {
      return (
        !this.responseData &&
          this.isLoading
      )
    },
    isPageError () {
      return (
        !this.responseData &&
          !!this.error
      )
    }
  },
  watch: {
    isPageLoading: 'handleIsPageLoadingChange',
    isPageError: 'handleIsPageErrorChange'
  },
  mounted () {
    this.scrollToTop()
  },
  activated () {
    if (this.isPageError) {
      this.setPageError()
    }
  },
  methods: {
    ...mapActions(
      layoutStore,
      [
        'setNavigationSections'
      ]
    ),
    handleIsPageLoadingChange () {
      this.setPageLoading()
    },
    handleIsPageErrorChange () {
      this.setPageError()
    },
    scrollToTop () {
      window.scrollTo(
        0,
        0
      )
    },
    setPageLoading () {
      toggleLoaderDimmer(
        this.isPageLoading
      )

      if (this.isPageLoading) {
        this.setNavigationSections(
          formatLoadingPageNavigation()
        )
      }

      this.updateTabLoading()
    },
    setPageError () {
      if (this.isPageError) {
        this.setNavigationSections(
          formatErrorPageNavigation()
        )
      }

      this.updateTabError()
    },
    updateTabLoading () {
      ipcRenderer.send(
        'update-tab',
        {
          tabId: this.tabId,
          isLoading:
            this.isPageLoading
        }
      )
    },
    updateTabError () {
      ipcRenderer.send(
        'update-tab',
        {
          tabId: this.tabId,
          isError: this.isPageError
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
