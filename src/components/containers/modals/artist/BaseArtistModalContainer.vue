<template>
  <BaseSegmentModalContainer
    ref="modal"
    :response-data="artistData"
    :is-loading="isLoading"
    :error="error"
    @call="handleCall"
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
import modalMixin from '*/mixins/modalMixin'

export default {
  name: 'BaseArtistModalContainer',
  components: {
    BaseSegmentModalContainer
  },
  mixins: [
    modalMixin
  ],
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
      artistData: null,
      error: null,
      isLoading: false
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
    getData () {
      this.getArtist(
        this.artistArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
