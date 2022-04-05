<template>
  <div
    class="ui raised segments main-segment-container"
    ref="segment"
  >
    <BaseHeaderSegment
      :scope="scope"
      :link="headerLink"
    />

    <slot
      :isLoading="isLoading"
      :error="error"
      :topData="topData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </div>
</template>

<script>
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import getTop from '*/helpers/actions/api/top/get'
import { focusOnSegment } from '*/helpers/actions/layout'

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
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getTop,
    fetchData (page) {
      this.getTop({
        ...this.topArgs,
        page
      })
    },
    focus () {
      this.$nextTick(() => {
        focusOnSegment(
          this.$refs.segment
        )
      })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="sass" scoped></style>
