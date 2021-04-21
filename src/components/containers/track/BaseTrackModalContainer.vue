<template>
  <BaseModalContainer
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
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/BaseModalContainer.vue'
import fetchTrackData from '#/actions/api/track/fetchData'

export default {
  name: 'BaseTrackModalContainer',
  components: {
    BaseModalContainer
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    artistName: String,
    trackTitle: String,
    sourceId: String,
    trackId: String
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
      this.error = null

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
