<template>
  <BaseSegmentModalContainer
    ref="modal"
    :response-data="artistData"
    :is-loading="isLoading"
    :error="error"
    @call="handleCall"
    @refresh="handleRefresh"
  >
    <slot
      :[scope]="artistData[scope]"
    />
  </BaseSegmentModalContainer>
</template>

<script>
import BaseSegmentModalContainer
  from '*/components/containers/modals/BaseSegmentModalContainer.vue'
import getArtist from '*/helpers/actions/api/artist/get'

export default {
  name: 'BaseArtistModalContainer',
  components: {
    BaseSegmentModalContainer
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
    artistArgs () {
      return {
        artistName: this.artistName,
        scope: this.scope
      }
    }
  },
  methods: {
    getArtist,
    handleCall () {
      this.fetchData()
    },
    handleRefresh () {
      this.fetchData()
    },
    fetchData () {
      this.getArtist(
        this.artistArgs
      )
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
