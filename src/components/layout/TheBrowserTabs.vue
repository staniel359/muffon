<template>
  <div
    class="ui top fixed menu browser-tabs-panel"
    :class="{ inverted: isDarkMode }"
  >
    <BrowserTab
      v-for="tabData in tabs"
      :key="tabData.uuid"
      :tabData="tabData"
      :activeTabId="activeTabId"
    />

    <BaseButton
      class="mini basic compact"
      icon="plus"
      @click="handleAddTabButtonClick"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ipcRenderer } from 'electron'
import local from '&/local'
import BrowserTab from './TheBrowserTabs/BrowserTab.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import { generateKey } from '#/utils'

export default {
  name: 'TheBrowserTabs',
  components: {
    BaseButton,
    BrowserTab
  },
  data () {
    return {
      activeTabId: null,
      tabs: []
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    localTabs () {
      return local.get(
        'layout.tabs'
      )
    },
    localActiveTabId () {
      return local.get(
        'layout.activeTabId'
      )
    }
  },
  watch: {
    tabs: 'handleTabsChange'
  },
  mounted () {
    ipcRenderer.send(
      'clear-tabs'
    )

    if (this.localTabs.length) {
      this.addTabsFromLocal()

      if (this.localActiveTabId) {
        this.setActiveTab()
      }
    } else {
      this.addNewTab()
    }

    ipcRenderer.on(
      'handle-add-tab',
      this.handleAddTab
    )

    ipcRenderer.on(
      'handle-set-top-tab',
      this.handleSetTopTab
    )

    ipcRenderer.on(
      'handle-remove-tab',
      this.handleRemoveTab
    )

    ipcRenderer.on(
      'handle-update-tab',
      this.handleUpdateTab
    )
  },
  methods: {
    handleTabsChange (value) {
      if (!value.length) {
        this.addNewTab()
      }

      local.set(
        'layout.tabs',
        value
      )
    },
    handleAddTabButtonClick () {
      this.addNewTab()
    },
    handleAddTab (_, value) {
      const tabs = [...this.tabs, value]

      this.tabs = tabs
    },
    handleSetTopTab (_, tabId) {
      this.activeTabId = tabId

      local.set(
        'layout.activeTabId',
        tabId
      )
    },
    handleRemoveTab (_, tabId) {
      const tabs = this.tabs.filter(tabData => {
        return tabData.uuid !== tabId
      })

      this.tabs = tabs
    },
    handleUpdateTab (_, { tabId, data }) {
      const isMatchedTab = tabData => {
        return tabData.uuid === tabId
      }

      const tab = this.tabs.find(
        isMatchedTab
      )

      if (tab) {
        const updateTabKeyValue = ([key, value]) => {
          tab[key] = value
        }

        Object.entries(data).forEach(
          updateTabKeyValue
        )
      }

      this.tabs = [...this.tabs]
    },
    addTabsFromLocal () {
      this.localTabs.forEach(
        this.addTab
      )
    },
    addTab (tabData) {
      ipcRenderer.send(
        'add-tab',
        tabData
      )
    },
    setActiveTab () {
      ipcRenderer.send(
        'set-top-tab',
        this.localActiveTabId
      )
    },
    addNewTab () {
      const tab = this.getNewTabData()

      this.addTab(tab)

      ipcRenderer.send(
        'set-top-tab',
        tab.uuid
      )
    },
    getNewTabData () {
      return {
        uuid: generateKey(),
        path: 'feed'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.browser-tabs-panel
  @extend .no-shadow, .d-flex, .align-items-center
  height: 45px
  padding: 0 0.5em
  &.inverted
    border-bottom: $borderInverted !important
</style>
