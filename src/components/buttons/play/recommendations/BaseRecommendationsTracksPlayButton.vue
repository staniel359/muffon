<template>
  <BasePlayButton
    :is-loading="isLoading"
    :error="error"
    :checked-options="checkedOptions"
    @click="handleClick"
  />
</template>

<script>
import getRecommendations from '@/helpers/actions/api/recommendations/get'
import playableListMixin from '@/mixins/playableListMixin'

export default {
  name: 'BaseRecommendationsTracksPlayButton',
  mixins: [
    playableListMixin
  ],
  props: {
    order: String
  },
  data () {
    return {
      recommendationsData: null
    }
  },
  computed: {
    recommendationsArgs () {
      return {
        scope: this.scope,
        limit: this.limitComputed,
        order: this.order
      }
    },
    tracksData () {
      return this.recommendationsData
    }
  },
  methods: {
    getRecommendations,
    getTracksData () {
      return this.getRecommendations(
        this.recommendationsArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
