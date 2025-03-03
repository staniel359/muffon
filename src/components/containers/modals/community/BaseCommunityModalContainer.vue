<template>
  <Component
    :is="component"
    ref="modal"
    :response-data="communityData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
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
        :[scope]="communityData[scope]"
      />
    </template>
  </Component>
</template>

<script>
import BasePaginatedSegmentModalContainer
  from '@/components/containers/modals/BasePaginatedSegmentModalContainer.vue'
import BaseSegmentModalContainer
  from '@/components/containers/modals/BaseSegmentModalContainer.vue'
import getCommunity from '@/helpers/actions/api/community/get'
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'BaseCommunityModalContainer',
  components: {
    BasePaginatedSegmentModalContainer,
    BaseSegmentModalContainer
  },
  mixins: [
    modalMixin
  ],
  props: {
    communityId: {
      type: Number,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    limit: Number,
    isPaginated: Boolean,
    isMultiple: Boolean
  },
  data () {
    return {
      communityData: null,
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
    communityArgs () {
      return {
        communityId: this.communityId,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  methods: {
    getCommunity,
    getData (
      {
        page
      } = {}
    ) {
      this.getCommunity(
        {
          ...this.communityArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
