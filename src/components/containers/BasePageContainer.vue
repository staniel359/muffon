<template>
  <div ref="container">
    <BaseErrorMessage
      v-if="isError"
      :error="error"
      @refresh="handleRefresh"
    />
    <slot v-else></slot>
  </div>
</template>

<script>
import BaseErrorMessage from '@/BaseErrorMessage.vue'
import { toggleLoaderDimmer } from '#/actions/layout'

export default {
  name: 'BasePageContainer',
  components: {
    BaseErrorMessage
  },
  props: {
    isShowLoader: {
      type: Boolean,
      default: true
    },
    isLoading: Boolean,
    isError: Boolean,
    error: Error
  },
  emits: [
    'init',
    'refresh'
  ],
  watch: {
    isLoading: {
      immediate: true,
      handler: 'handleIsLoadingChange'
    }
  },
  mounted () {
    this.$emit(
      'init',
      this.$refs.container
    )
  },
  methods: {
    handleIsLoadingChange (value) {
      toggleLoaderDimmer(
        this.isShowLoader && value
      )
    },
    handleRefresh () {
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="sass" scoped></style>
