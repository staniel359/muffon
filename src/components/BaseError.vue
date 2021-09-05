<template>
  <div class="main-error-container">
    <BaseMessage
      :icons="icons"
      :header="header"
      :content="content"
      :buttonData="buttonData"
      @buttonClick="handleButtonClick"
    />
  </div>
</template>

<script>
import BaseMessage from '@/BaseMessage.vue'
import errorsData from '#/data/errors'

export default {
  name: 'BaseError',
  components: {
    BaseMessage
  },
  props: {
    error: {
      type: Error,
      required: true
    },
    isWithButton: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'refresh'
  ],
  data () {
    return {
      errorData: {}
    }
  },
  computed: {
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
      if (
        this.isErrorRefreshable &&
          this.isWithButton
      ) {
        return {
          class: 'circular basic',
          icon: 'sync alternate'
        }
      } else {
        return null
      }
    },
    isErrorRefreshable () {
      return this.errorData.isRefreshable
    }
  },
  mounted () {
    this.setErrorData()
  },
  methods: {
    handleButtonClick () {
      this.$emit('refresh')
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
      const errorCode = this.error.response.status
      const isMatchedError = error => {
        return error.code === errorCode
      }

      this.errorData = {
        ...Object.values(errorsData).find(
          isMatchedError
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
