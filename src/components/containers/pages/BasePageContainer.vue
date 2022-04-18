<template>
  <div ref="page">
    <BaseErrorMessage
      v-if="isError"
      :error="error"
    />
    <slot
      v-else-if="responseData"
      :profile-id="profileId"
    />
  </div>
</template>

<script>
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
      'profile',
      {
        profileInfo: 'info'
      }
    ),
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
    window.scrollTo(
      0,
      0
    )

    this.$emit(
      'init',
      this.$refs.page
    )
  },
  methods: {
    handleIsLoadingChange (
      value
    ) {
      toggleLoaderDimmer(
        !this.responseData && value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
