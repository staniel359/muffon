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
      <slot :[scope]="trackData[scope]"></slot>
    </template>
  </BaseModalContentContainer>
</template>

<script>
import BaseModalContentContainer
  from '@/containers/BaseModalContentContainer.vue'
import fetchTrackData from '#/actions/api/track/fetchData'

export default {
  name: 'BaseTrackModalContainer',
  components: {
    BaseModalContentContainer
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    artistName: String,
    trackTitle: String,
    sourceId: String,
    trackId: Number
  },
  data () {
    return {
      isLoading: false,
      error: null,
      trackData: null
    }
  },
  computed: {
    trackDataArgs () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        scope: this.scope,
        sourceId: this.sourceId,
        trackId: this.trackId
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
    fetchTrackData,
    fetchData () {
      this.fetchTrackData(this.trackDataArgs)
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
