<template>
  <slot
    :history-data="historyData"
    :response-page-limit="responsePageLimit"
    :is-loading="isLoading"
    :error="error"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import getRemoteHistory from '@/helpers/actions/api/history/get'
import getLocalHistory from '@/helpers/actions/local/history/get'

export default {
  name: 'BaseHistorySegmentContainer',
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
    listScope: {
      type: String,
      required: true
    },
    limit: Number
  },
  data () {
    return {
      historyData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    historyArgs () {
      return {
        scope: this.scope,
        listScope: this.listScope,
        limit: this.limit,
        order: 'createdDesc'
      }
    },
    responsePageLimit () {
      if (this.profileId) {
        return null
      } else {
        return this.historyData?.[
          this.listScope
        ]?.length
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getRemoteHistory,
    getLocalHistory,
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
    getHistory (
      args
    ) {
      if (this.profileId) {
        return this.getRemoteHistory(
          args
        )
      } else {
        return this.getLocalHistory(
          args
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
