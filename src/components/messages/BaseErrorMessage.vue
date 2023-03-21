<template>
  <div class="main-error-message">
    <BaseMessage
      :class="transparentClass"
      :icon="icon"
      :icons="icons"
      :header="header"
      :content="content"
      :is-with-refresh-button="isRenderRefreshButton"
      @refresh-button-click="handleRefreshButtonClick"
    />
  </div>
</template>

<script>
import BaseMessage from '@/components/messages/BaseMessage.vue'
import errorsData from '@/helpers/data/errors'
import transparencyMixin from '@/mixins/transparencyMixin'

export default {
  name: 'BaseErrorMessage',
  components: {
    BaseMessage
  },
  mixins: [
    transparencyMixin
  ],
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
    icon () {
      return this.errorData.icon
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
    handleRefreshButtonClick () {
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
