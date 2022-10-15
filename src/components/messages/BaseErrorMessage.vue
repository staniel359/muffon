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
import BaseMessage from '@/components/messages/BaseMessage.vue'
import errorsData from '@/helpers/data/errors'

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
      refreshButtonData: {
        class: 'circular basic',
        icon: 'sync alternate'
      }
    }
  },
  computed: {
    errorData () {
      if (this.isServerError) {
        return this.responseErrorData
      } else {
        return this.clientErrorData
      }
    },
    isServerError () {
      return this.error.isAxiosError
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
    clientErrorData () {
      return {
        ...errorsData.client
      }
    },
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
    errorCode () {
      return this.error.response?.status || 0
    }
  },
  methods: {
    handleButtonClick () {
      this.$emit(
        'refresh'
      )
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
