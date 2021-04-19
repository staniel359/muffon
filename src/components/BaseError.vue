<template>
  <div class="ui icon message main-message">
    <i class="icons error-icon-group">
      <i
        v-for="(errorIcon, index) in errorIcons"
        class="icon"
        :key="index"
        :class="errorIcon"
      />
    </i>

    <div class="content">
      <div class="header">
        {{ errorHeader }}
      </div>
      <p>
        {{ errorContent }}
      </p>
    </div>

    <button
      v-if="isErrorRefreshable"
      class="circular ui icon basic button"
      @click="handleRefresh"
    >
      <i class="icon sync alternate" />
    </button>
  </div>
</template>

<script>
import errorsData from '#/data/errors'

export default {
  name: 'BaseError',
  props: {
    error: {
      type: Error,
      required: true
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
    errorIcons () {
      return this.errorData.icons
    },
    errorHeader () {
      return this.errorData.header
    },
    errorContent () {
      return this.errorData.content
    },
    isErrorRefreshable () {
      return this.errorData.isRefreshable
    }
  },
  mounted () {
    this.setErrorData()
  },
  methods: {
    handleRefresh () {
      this.$emit('refresh')
    },
    setErrorData () {
      if (this.error.isAxiosError) {
        this.setAxiosErrorData()
      } else {
        this.errorData = { ...errorsData.client }
      }
    },
    setAxiosErrorData () {
      if (this.error.response) {
        this.setResponseErrorData()
      } else {
        this.errorData = { ...errorsData.connection }
      }
    },
    setResponseErrorData () {
      const errorCode = this.error.response.status
      const isMatchedError = error => error.code === errorCode

      this.errorData = {
        ...Object.values(errorsData).find(isMatchedError)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.error-icon-group
  font-size: 3em
  margin-right: 0.5em
</style>
