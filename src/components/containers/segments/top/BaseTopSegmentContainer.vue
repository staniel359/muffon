<template>
  <div
    class="ui raised segments main-segment-container"
    ref="segment"
  >
    <HeaderSegment
      :scope="scope"
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
import HeaderSegment from './BaseTopSegmentContainer/HeaderSegment.vue'
import getTop from '#/actions/api/top/get'
import { focusOnSegment } from '#/actions/layout'

export default {
  name: 'BaseTopSegmentContainer',
  components: {
    HeaderSegment
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    responsePageLimit: Number
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
        limit: this.responsePageLimit
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
