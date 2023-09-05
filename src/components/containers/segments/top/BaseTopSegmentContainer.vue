<template>
  <slot
    :top-data="topData"
    :is-loading="isLoading"
    :error="error"
  />
</template>

<script>
import getTop from '@/helpers/actions/api/top/get'

export default {
  name: 'BaseTopSegmentContainer',
  provide () {
    return {
      getData: this.getData
    }
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    country: String,
    limit: Number
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
        country: this.country,
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
