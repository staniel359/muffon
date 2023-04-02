<template>
  <div
    id="the-browser-tabs-observer"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'TheBrowserTabsObserver',
  computed: {
    ...mapState(
      layoutStore,
      [
        'tabs'
      ]
    )
  },
  mounted () {
    ipcRenderer.on(
      'add-tab',
      this.handleAddTab
    )

    ipcRenderer.on(
      'set-active-tab',
      this.handleSetActiveTab
    )

    ipcRenderer.on(
      'update-tab',
      this.handleUpdateTab
    )

    ipcRenderer.on(
      'delete-tab',
      this.handleDeleteTab
    )
  },
  methods: {
    handleAddTab (
      _,
      value
    ) {
      function isMatchedTab (
        tabData
      ) {
        return (
          tabData.uuid ===
            value.uuid
        )
      }

      const isTabPresent =
        this.tabs.find(
          isMatchedTab
        )

      if (!isTabPresent) {
        const tabs = [
          ...this.tabs,
          value
        ]

        updateGlobalStore(
          {
            'layout.tabs': tabs
          }
        )
      }
    },
    handleSetActiveTab (
      _,
      value
    ) {
      updateGlobalStore(
        {
          'layout.activeTabId': value
        }
      )
    },
    handleUpdateTab (
      _,
      {
        tabId,
        data
      }
    ) {
      const tabs = [
        ...this.tabs
      ]

      function isMatchedTab (
        tabData
      ) {
        return (
          tabData.uuid === tabId
        )
      }

      const tab =
        tabs.find(
          isMatchedTab
        )

      const isUpdateTab = (
        tab && data
      )

      function updateTab () {
        Object.assign(
          tab,
          data
        )
      }

      if (isUpdateTab) {
        updateTab()

        updateGlobalStore(
          {
            'layout.tabs': tabs
          }
        )
      }
    },
    handleDeleteTab (
      _,
      tabId
    ) {
      function isMatchedTab (
        tabData
      ) {
        return (
          tabData.uuid !== tabId
        )
      }

      const tabs = [
        ...this.tabs.filter(
          isMatchedTab
        )
      ]

      updateGlobalStore(
        {
          'layout.tabs': tabs
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
