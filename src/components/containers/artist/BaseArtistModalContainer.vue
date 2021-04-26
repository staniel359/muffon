<template>
  <BaseModalContentContainer
    ref="modal"
    :isLoading="isLoading"
    :error="error"
    :responseData="artistData"
    @call="handleModalCall"
    @refresh="handleModalRefresh"
  >
    <template #default>
      <slot :[scope]="artistData[scope]"></slot>
    </template>
  </BaseModalContentContainer>
</template>

<script>
import BaseModalContentContainer
  from '@/containers/BaseModalContentContainer.vue'
import fetchArtistData from '#/actions/api/artist/fetchData'

export default {
  name: 'BaseArtistModalContainer',
  components: {
    BaseModalContentContainer
  },
  props: {
    artistName: {
      type: String,
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
      artistData: null
    }
  },
  computed: {
    artistDataArgs () {
      return {
        artistName: this.artistName,
        scope: this.scope
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
    fetchArtistData,
    fetchData () {
      this.fetchArtistData(this.artistDataArgs)
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
