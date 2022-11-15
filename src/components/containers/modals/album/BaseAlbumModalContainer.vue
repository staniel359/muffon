<template>
  <Component
    :is="component"
    ref="modal"
    :key="key"
    :response-data="albumData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    :text-scope="textScope"
    :limit="limit"
    @call="handleCall"
  >
    <slot
      :[scope]="albumData[scope]"
    />
  </Component>
</template>

<script>
import BasePaginatedSegmentModalContainer
  from '@/components/containers/modals/BasePaginatedSegmentModalContainer.vue'
import BaseSegmentModalContainer
  from '@/components/containers/modals/BaseSegmentModalContainer.vue'
import getAlbum from '@/helpers/actions/api/album/get'
import {
  generateKey
} from '@/helpers/utils'
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'BaseAlbumModalContainer',
  components: {
    BasePaginatedSegmentModalContainer,
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
    },
    textScope: String,
    limit: Number,
    isPaginated: Boolean
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
    component () {
      if (this.isPaginated) {
        return 'BasePaginatedSegmentModalContainer'
      } else {
        return 'BaseSegmentModalContainer'
      }
    },
    albumArgs () {
      return {
        ...this.requestAlbumData,
        scope: this.scope,
        limit: this.limit
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
