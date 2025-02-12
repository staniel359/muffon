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
        this.openNewTab(
          {
            path
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
