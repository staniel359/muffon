<template>
  <div ref="container">
    <BaseErrorMessage
      v-if="isError"
      :error="error"
    />
    <slot
      v-else-if="responseData"
      :profileId="profileId"
    ></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseErrorMessage from '*/components/messages/BaseErrorMessage.vue'
import { toggleLoaderDimmer } from '*/helpers/actions/layout'

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
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    profileId () {
      return this.profileInfo.id.toString()
    },
    isError () {
      return !!(
        !this.responseData &&
          this.error
      )
    }
  },
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
        !this.responseData && value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
