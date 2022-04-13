<template>
  <div class="main-error-container">
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
      return this.errorData.header
    },
    content () {
      return this.errorData.content
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
      if (this.error.isAxiosError) {
        this.setAxiosErrorData()
      } else {
        this.errorData = {
          ...errorsData.client
        }
      }
    },
    setAxiosErrorData () {
      if (this.error.response) {
        this.setResponseErrorData()
      } else {
        this.errorData = {
          ...errorsData.connection
        }
      }
    },
    setResponseErrorData () {
      this.errorData =
        this.responseErrorData
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
