<template>
  <BaseHeaderSegmentsContainer
    ref="segment"
    :scope="scope"
    :header-link="headerLink"
  >
    <slot
      :top-data="topData"
      :is-loading="isLoading"
      :error="error"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import getTop from '@/helpers/actions/api/top/get'

export default {
  name: 'BaseTopSegmentContainer',
  components: {
    BaseHeaderSegmentsContainer
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    limit: Number,
    headerLink: Object
  },
  data () {
    return {
      topData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    topArgs () {
      return {
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getTop,
    getData (
      {
        page
      } = {}
    ) {
      this.getTop(
        {
          ...this.topArgs,
          page
        }
      )
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
