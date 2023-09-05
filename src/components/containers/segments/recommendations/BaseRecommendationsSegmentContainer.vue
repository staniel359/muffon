<template>
  <slot
    :recommendations-data="recommendationsData"
    :is-loading="isLoading"
    :error="error"
  />
</template>

<script>
import getRecommendations from '@/helpers/actions/api/recommendations/get'

export default {
  name: 'BaseRecommendationsSegmentContainer',
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
    limit: Number
  },
  data () {
    return {
      recommendationsData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    recommendationsArgs () {
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
    getRecommendations,
    getData (
      {
        page
      } = {}
    ) {
      this.getRecommendations(
        {
          ...this.recommendationsArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
