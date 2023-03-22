<template>
  <Component
    :is="component"
    ref="modal"
    :response-data="artistData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    :text-scope="textScope"
    :limit="limit"
    :is-multiple="isMultiple"
    @call="handleCall"
  >
    <template
      #default="slotProps"
    >
      <slot
        v-if="isPaginated"
        :[scope]="slotProps[scope]"
      />
      <slot
        v-else
        :[scope]="artistData[scope]"
      />
    </template>
  </Component>
</template>

<script>
import BasePaginatedSegmentModalContainer
  from '@/components/containers/modals/BasePaginatedSegmentModalContainer.vue'
import BaseSegmentModalContainer
  from '@/components/containers/modals/BaseSegmentModalContainer.vue'
import getArtist from '@/helpers/actions/api/artist/get'
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'BaseArtistModalContainer',
  components: {
    BasePaginatedSegmentModalContainer,
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
    },
    textScope: String,
    limit: Number,
    isPaginated: Boolean,
    isMultiple: Boolean
  },
  data () {
    return {
      artistData: null,
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
    artistArgs () {
      return {
        artistName: this.artistName,
        scope: this.scope,
        limit: this.limit
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
