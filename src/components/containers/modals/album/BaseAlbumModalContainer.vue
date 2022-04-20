<template>
  <BaseSegmentModalContainer
    ref="modal"
    :key="key"
    :response-data="albumData"
    :is-loading="isLoading"
    :error="error"
    @call="handleCall"
    @refresh="handleRefresh"
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

export default {
  name: 'BaseAlbumModalContainer',
  components: {
    BaseSegmentModalContainer
  },
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
      isLoading: false,
      error: null,
      albumData: null
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
    handleCall () {
      this.fetchData()
    },
    handleRefresh () {
      this.fetchData()
    },
    handleRequestAlbumDataChange () {
      this.albumData = null

      this.key = generateKey()
    },
    fetchData () {
      this.getAlbum(
        this.albumArgs
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
