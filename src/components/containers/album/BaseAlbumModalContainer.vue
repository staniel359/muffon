<template>
  <BaseModalContentContainer
    ref="modal"
    :key="key"
    :isLoading="isLoading"
    :error="error"
    :responseData="albumData"
    @call="handleModalCall"
    @refresh="handleModalRefresh"
  >
    <template #default>
      <slot :[scope]="albumData[scope]"></slot>
    </template>
  </BaseModalContentContainer>
</template>

<script>
import BaseModalContentContainer
  from '@/containers/BaseModalContentContainer.vue'
import fetchAlbumData from '#/actions/api/album/fetchData'
import { generateKey } from '#/utils'

export default {
  name: 'BaseAlbumModalContainer',
  components: {
    BaseModalContentContainer
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
    albumDataArgs () {
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
    handleModalCall () {
      this.fetchData()
    },
    handleModalRefresh () {
      this.error = null

      this.fetchData()
    },
    handleRequestAlbumDataChange () {
      this.albumData = null
      this.key = generateKey()
    },
    fetchAlbumData,
    fetchData () {
      this.fetchAlbumData(this.albumDataArgs)
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
