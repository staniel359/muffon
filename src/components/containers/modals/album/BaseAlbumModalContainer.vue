<template>
  <BaseSegmentModalContainer
    ref="modal"
    :key="key"
    :response-data="albumData"
    :is-loading="isLoading"
    :error="error"
    @call="handleCall"
  >
    <slot
      :[scope]="albumData[scope]"
    />
  </BaseSegmentModalContainer>
</template>

<script>
import BaseSegmentModalContainer
  from '*/components/containers/modals/BaseSegmentModalContainer.vue'
import getAlbum from '*/helpers/actions/api/album/get'
import {
  generateKey
} from '*/helpers/utils'
import modalMixin from '*/mixins/modalMixin'

export default {
  name: 'BaseAlbumModalContainer',
  components: {
    BaseSegmentModalContainer
  },
  mixins: [
    modalMixin
  ],
  props: {
    requestAlbumData: {
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
      key: null,
      albumData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    albumArgs () {
      return {
        ...this.requestAlbumData,
        scope: this.scope
      }
    }
  },
  watch: {
    requestAlbumData: 'handleRequestAlbumDataChange'
  },
  methods: {
    getAlbum,
    handleRequestAlbumDataChange () {
      this.albumData = null

      this.key = generateKey()
    },
    getData () {
      this.getAlbum(
        this.albumArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
