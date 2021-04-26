<template>
  <div ref="container">
    <BaseError
      v-if="error"
      :error="error"
      @refresh="handleRefresh"
    />
    <slot v-else></slot>
  </div>
</template>

<script>
import BaseError from '@/BaseError.vue'
import { toggleLoaderDimmer } from '#/actions/layout'

export default {
  name: 'BasePageContainer',
  components: {
    BaseError
  },
  props: {
    isShowLoader: {
      type: Boolean,
      default: true
    },
    isLoading: Boolean,
    error: Error
  },
  emits: [
    'init',
    'refresh'
  ],
  watch: {
    isLoading: {
      immediate: true,
      handler: 'handleLoadingChange'
    }
  },
  mounted () {
    this.$emit('init', this.$refs.container)
  },
  methods: {
    handleLoadingChange (value) {
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
