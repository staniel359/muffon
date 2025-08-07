<template>
  <div
    id="the-deep-links-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import newTabMixin from '@/mixins/newTabMixin'
import {
  sanitizeString
} from '@/helpers/utils'

export default {
  name: 'TheDeepLinksObserver',
  mixins: [
    newTabMixin
  ],
  data () {
    return {
      isTabsLoaded: false
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id',
        isProfileAnonymous: 'isAnonymous'
      }
    ),
    isLoggedIn () {
      return (
        this.profileId ||
          this.isProfileAnonymous
      )
    }
  },
  watch: {
    isTabsLoaded: {
      immediate: true,
      handler: 'handleIsTabsLoadedChange'
    }
  },
  mounted () {
    window
      .mainProcess
      .addCommandHandler(
        'set-active-tab',
        this.handleSetActiveTab
      )

    window
      .mainProcess
      .addCommandHandler(
        'open-deep-link',
        this.handleOpenDeepLink
      )
  },
  methods: {
    handleSetActiveTab () {
      this.isTabsLoaded = true
    },
    handleIsTabsLoadedChange (
      value
    ) {
      if (value) {
        this.callOpenDeepLink()
      }
    },
    handleOpenDeepLink (
      _,
      {
        path
      }
    ) {
      if (this.isLoggedIn) {
        const pathSanitized =
          sanitizeString(
            path
          )

        this.openNewTab(
          {
            path: pathSanitized
          }
        )
      }
    },
    callOpenDeepLink () {
      window
        .mainProcess
        .sendCommand(
          'call-open-deep-link'
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
