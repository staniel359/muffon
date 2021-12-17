<template>
  <BaseModalContentContainer
    ref="modal"
    :isLoading="isLoading"
    :error="error"
    :responseData="trackData"
    @call="handleModalCall"
    @refresh="handleModalRefresh"
  >
    <template #default>
      <slot
        :[scope]="trackData[scope]"
      ></slot>
    </template>
  </BaseModalContentContainer>
</template>

<script>
import BaseModalContentContainer
  from '@/containers/modals/BaseModalContentContainer.vue'
import getTrack from '#/actions/api/track/get'

export default {
  name: 'BaseTrackModalContainer',
  components: {
    BaseModalContentContainer
  },
  props: {
    requestTrackData: {
      type: Object,
      required: true
    },
    scope: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      error: null,
      trackData: null
    }
  },
  computed: {
    trackArgs () {
      return {
        ...this.requestTrackData,
        scope: this.scope
      }
    }
  },
  methods: {
    handleModalCall () {
      this.fetchData()
    },
    handleModalRefresh () {
      this.fetchData()
    },
    getTrack,
    fetchData () {
      this.getTrack(
        this.trackArgs
      )
    },
    show () {
      this.$refs.modal.show()
    },
    hide () {
      this.$refs.modal.hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
