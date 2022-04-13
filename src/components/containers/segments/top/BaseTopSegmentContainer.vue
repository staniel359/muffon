<template>
  <div
    ref="segment"
    :class="[
      'ui raised segments',
      'main-segment-container'
    ]"
  >
    <BaseHeaderSegment
      :scope="scope"
      :link="headerLink"
    />

    <slot
      :top-data="topData"
      :is-loading="isLoading"
      :error="error"
      :fetch-data="fetchData"
      :refresh="refresh"
    />
  </div>
</template>

<script>
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import getTop from '*/helpers/actions/api/top/get'
import {
  focusOnSegment
} from '*/helpers/actions/layout'

export default {
  name: 'BaseTopSegmentContainer',
  components: {
    BaseHeaderSegment
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
      error: null,
      topData: null,
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
    this.fetchData()
  },
  methods: {
    getTop,
    fetchData (
      page
    ) {
      this.getTop(
        {
          ...this.topArgs,
          page
        }
      )
    },
    refresh (
      page
    ) {
      this.fetchData(
        page
      )
    },
    focus () {
      focusOnSegment(
        this.$refs.segment
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
