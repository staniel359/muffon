<template>
  <div
    id="the-browser-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import historyStore from '@/stores/history'
import {
  currentTime as formatCurrentTime
} from '@/helpers/formatters/dateTimeString'
import updateHistory from '@/helpers/actions/api/history/update'

export default {
  name: 'TheBrowserObserver',
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id',
        isProfileAnonymous: 'isAnonymous'
      }
    ),
    ...mapState(
      historyStore,
      {
        isSaveBrowserHistory: 'isSaveBrowser'
      }
    )
  },
  mounted () {
    window
      .mainProcess
      .addCommandHandler(
        'navigate',
        this.handleNavigate
      )
  },
  methods: {
    handleNavigate (
      _,
      routeData
    ) {
      if (this.isSaveBrowserHistory) {
        this.addRouteToHistory(
          routeData
        )
      }
    },
    addRouteToHistory (
      value
    ) {
      if (this.isProfileAnonymous) {
        this.addRouteToAnonymousHistory(
          value
        )
      } else if (this.profileId) {
        this.addRouteToProfileHistory(
          value
        )
      }
    },
    addRouteToAnonymousHistory (
      value
    ) {
      value.created =
        formatCurrentTime()

      const valueFormatted =
        JSON.stringify(
          value
        )

      window
        .mainProcess
        .sendAsyncCommand(
          'add-electron-store-value',
          'history.browser',
          valueFormatted
        )
    },
    addRouteToProfileHistory (
      value
    ) {
      const historyArgs = {
        scope: 'browser',
        route: value
      }

      updateHistory(
        historyArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
