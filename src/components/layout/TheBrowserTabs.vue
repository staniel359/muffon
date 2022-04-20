<template>
  <div
    :class="[
      'ui top fixed menu',
      'the-browser-tabs',
      {
        inverted: isDarkMode
      }
    ]"
  >
    <BrowserTab
      v-for="tabData in tabs"
      :key="tabData.uuid"
      :tab-data="tabData"
      :active-tab-id="activeTabId"
    />

    <BaseButton
      class="mini basic compact"
      icon="plus"
      @click="handleAddTabButtonClick"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  ipcRenderer
} from 'electron'
import electronStore from '*/plugins/electronStore'
import BrowserTab from './TheBrowserTabs/BrowserTab.vue'
import BaseButton from '*/components/buttons/BaseButton.vue'
import {
  generateKey
} from '*/helpers/utils'

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
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    electronStoreTabs () {
      return electronStore.get(
        'layout.tabs'
      )
    },
    electronStoreActiveTabId () {
      return electronStore.get(
        'layout.activeTabId'
      )
    }
  },
  watch: {
    tabs: 'handleTabsChange'
  },
  mounted () {
    this.clearTabs()

    if (this.electronStoreTabs.length) {
      this.addTabsFromElectronStore()

      if (this.electronStoreActiveTabId) {
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
  unmounted () {
    this.clearTabs()
  },
  methods: {
    handleTabsChange (
      value
    ) {
      if (!value.length) {
        this.addNewTab()
      }

      electronStore.set(
        'layout.tabs',
        value
      )
    },
    handleAddTabButtonClick () {
      this.addNewTab()
    },
    handleAddTab (
      _,
      value
    ) {
      this.tabs = [
        ...this.tabs,
        value
      ]
    },
    handleSetTopTab (
      _,
      tabId
    ) {
      this.activeTabId = tabId

      electronStore.set(
        'layout.activeTabId',
        tabId
      )
    },
    handleRemoveTab (
      _,
      tabId
    ) {
      function isMatchedTab (
        tabData
      ) {
        return tabData.uuid !== tabId
      }

      this.tabs =
        this.tabs.filter(
          isMatchedTab
        )
    },
    handleUpdateTab (
      _,
      {
        tabId,
        data
      }
    ) {
      function isMatchedTab (
        tabData
      ) {
        return tabData.uuid === tabId
      }

      const tab =
        this.tabs.find(
          isMatchedTab
        )

      function updateTabKeyValue (
        [
          key,
          value
        ]
      ) {
        tab[key] = value
      }

      if (tab) {
        Object.entries(
          data
        ).forEach(
          updateTabKeyValue
        )
      }

      this.tabs = [
        ...this.tabs
      ]
    },
    clearTabs () {
      ipcRenderer.send(
        'clear-tabs'
      )
    },
    addTabsFromElectronStore () {
      this.electronStoreTabs.forEach(
        this.addTab
      )
    },
    addTab (
      tabData
    ) {
      ipcRenderer.send(
        'add-tab',
        tabData
      )
    },
    setActiveTab () {
      ipcRenderer.send(
        'set-top-tab',
        this.electronStoreActiveTabId
      )
    },
    addNewTab () {
      const tab = this.getNewTabData()

      this.addTab(
        tab
      )

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
.the-browser-tabs
  @extend .no-shadow, .d-flex, .align-items-center, .overflow-y-auto
  height: 45px
  padding: 0 0.5em
  &.inverted
    border-bottom: $borderInverted !important
  &::-webkit-scrollbar
    @extend .d-none
</style>
