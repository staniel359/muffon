<template>
  <BasePlayButton
    :is-loading="isLoading"
    :error="error"
    :checked-options="checkedOptions"
    @click="handleClick"
  />
</template>

<script>
import getTop from '@/helpers/actions/api/top/get'
import playableListMixin from '@/mixins/playableListMixin'

export default {
  name: 'BaseTopTracksPlayButton',
  mixins: [
    playableListMixin
  ],
  props: {
    country: String
  },
  data () {
    return {
      topData: null
    }
  },
  computed: {
    topArgs () {
      return {
        scope: this.scope,
        country: this.country,
        limit: this.limitComputed
      }
    },
    tracksData () {
      return this.topData
    }
  },
  methods: {
    getTop,
    getTracksData () {
      return this.getTop(
        this.topArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
