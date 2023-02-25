<template>
  <BaseHeaderSegmentsContainer
    ref="segment"
    :scope="scope"
    :header-link="headerLink"
  >
    <slot
      :history-data="historyData"
      :is-loading="isLoading"
      :error="error"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import electronStore from '#/plugins/electronStore'
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import getHistory from '@/helpers/actions/api/history/get'

export default {
  name: 'BaseHistorySegmentContainer',
  components: {
    BaseHeaderSegmentsContainer
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    isGetData: {
      type: Boolean,
      default: true
    },
    limit: Number,
    headerLink: Object
  },
  data () {
    return {
      historyData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    historyArgs () {
      return {
        scope: this.scope,
        limit: this.limit
      }
    },
    isPlayerScope () {
      return (
        this.scope === 'player'
      )
    },
    playerHistoryData () {
      return {
        page: 1,
        total_pages: 1,
        tracks: this.playerTracks
      }
    },
    playerTracks () {
      return electronStore.get(
        'history.player'
      )
    }
  },
  mounted () {
    if (this.isGetData) {
      this.getData()
    } else {
      if (this.isPlayerScope) {
        this.historyData =
          this.playerHistoryData
      }
    }
  },
  methods: {
    getHistory,
    getData (
      {
        page
      } = {}
    ) {
      this.getHistory(
        {
          ...this.historyArgs,
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
