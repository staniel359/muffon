<template>
  <div ref="page">
    <BaseErrorMessage
      v-if="isPageError"
      :error="error"
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
  mapState
} from 'vuex'
import BaseErrorMessage from '*/components/messages/BaseErrorMessage.vue'
import {
  toggleLoaderDimmer
} from '*/helpers/actions/layout'

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
  emits: [
    'init'
  ],
  computed: {
    ...mapState(
      'layout',
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
    isPageLoading: {
      immediate: true,
      handler: 'handleIsPageLoadingChange'
    },
    isPageError: {
      immediate: true,
      handler: 'handleIsPageErrorChange'
    }
  },
  mounted () {
    this.scrollToTop()

    this.$emit(
      'init',
      this.$refs.page
    )
  },
  methods: {
    handleIsPageLoadingChange (
      value
    ) {
      toggleLoaderDimmer(
        value
      )

      this.updateTabLoading()
    },
    handleIsPageErrorChange (
      value
    ) {
      this.updateTabError()
    },
    scrollToTop () {
      window.scrollTo(
        0,
        0
      )
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
