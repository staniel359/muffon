<template>
  <div class="main-error-message">
    <BaseMessage
      :icons="icons"
      :header="header"
      :content="content"
      :button-data="buttonData"
      @button-click="handleButtonClick"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseMessage from '*/components/messages/BaseMessage.vue'
import errorsData from '*/helpers/data/errors'

export default {
  name: 'BaseErrorMessage',
  components: {
    BaseMessage
  },
  props: {
    error: {
      type: Error,
      required: true
    },
    isWithRefreshButton: Boolean
  },
  emits: [
    'refresh'
  ],
  data () {
    return {
      errorData: {},
      refreshButtonData: {
        class: 'circular basic',
        icon: 'sync alternate'
      }
    }
  },
  computed: {
    ...mapState(
      'profile',
      {
        profileLanguage: 'language'
      }
    ),
    icons () {
      return this.errorData.icons
    },
    header () {
      return this.$t(
        `errors.${this.errorId}.header`
      )
    },
    errorId () {
      return this.errorData.id
    },
    content () {
      return this.$t(
        `errors.${this.errorId}.content`
      )
    },
    buttonData () {
      if (this.isRenderRefreshButton) {
        return this.refreshButtonData
      } else {
        return null
      }
    },
    isRenderRefreshButton () {
      return (
        this.isErrorRefreshable &&
          this.isWithRefreshButton
      )
    },
    isErrorRefreshable () {
      return this.errorData.isRefreshable
    },
    responseErrorData () {
      return {
        ...Object.values(
          errorsData
        ).find(
          this.isMatchedError
        )
      }
    },
    errorCode () {
      return this.error.response.status
    },
    isServerError () {
      return this.error.isAxiosError
    }
  },
  watch: {
    profileLanguage: {
      immediate: true,
      handler: 'handleProfileLanguageChange'
    }
  },
  methods: {
    handleProfileLanguageChange () {
      this.setErrorData()
    },
    handleButtonClick () {
      this.$emit(
        'refresh'
      )
    },
    setErrorData () {
      if (this.isServerError) {
        this.setResponseErrorData()
      } else {
        this.setClientErrorData()
      }
    },
    setResponseErrorData () {
      this.errorData =
        this.responseErrorData
    },
    setClientErrorData () {
      this.errorData = {
        ...errorsData.client
      }
    },
    isMatchedError (
      error
    ) {
      return (
        error.code ===
          this.errorCode
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
