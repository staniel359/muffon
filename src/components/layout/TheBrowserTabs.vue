<template>
  <BaseMenuContainer
    class="top fixed the-browser-tabs"
  >
    <BrowserTab
      v-for="tabData in tabs"
      :key="tabData.uuid"
      :tab-data="tabData"
      :active-tab-id="activeTabId"
    />

    <BaseButton
      class="mini basic circular compact"
      icon="add"
      @click="handleAddTabButtonClick"
    />
  </BaseMenuContainer>
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import BaseMenuContainer from '@/components/containers/BaseMenuContainer.vue'
import BrowserTab from './TheBrowserTabs/BrowserTab.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import {
  generateKey,
  isObjectChanged
} from '@/helpers/utils'
import {
  home as formatHomeLink
} from '@/helpers/formatters/links'

export default {
  name: 'TheBrowserTabs',
  components: {
    BaseMenuContainer,
    BaseButton,
    BrowserTab
  },
  data () {
    return {
      activeTabId: null,
      tabs: []
    }
  },
  watch: {
    tabs: 'handleTabsChange'
  },
  async mounted () {
    ipcRenderer.on(
      'add-tab',
      this.handleAddTab
    )

    ipcRenderer.on(
      'set-active-tab',
      this.handleSetActiveTab
    )

    ipcRenderer.on(
      'delete-tab',
      this.handleDeleteTab
    )

    ipcRenderer.on(
      'update-tab',
      this.handleUpdateTab
    )

    this.clearTabs()

    const electronStoreTabs =
      await this.getElectronStoreTabs()

    if (electronStoreTabs.length) {
      electronStoreTabs.forEach(
        this.addTab
      )

      const electronStoreActiveTabId =
        await this.getElectronStoreActiveTabId()

      if (electronStoreActiveTabId) {
        this.setActiveTab(
          electronStoreActiveTabId
        )
      }
    } else {
      this.addNewTab()
    }
  },
  unmounted () {
    this.clearTabs()
  },
  methods: {
    handleTabsChange (
      value,
      oldValue
    ) {
      if (!value.length) {
        this.addNewTab()
      }

      const isChanged =
        isObjectChanged(
          value,
          oldValue
        )

      if (isChanged) {
        this.setElectronStoreTabs()
      }
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
    async handleSetActiveTab (
      _,
      tabId
    ) {
      this.activeTabId = tabId

      await this.$nextTick()

      this.setElectronStoreActiveTabId()
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

      const tabs =
        this.tabs.filter(
          isMatchedTab
        )

      this.tabs = [
        ...tabs
      ]
    },
    handleUpdateTab (
      _,
      {
        tabId,
        data
      }
    ) {
      function formatTabData (
        tabData
      ) {
        return {
          ...tabData
        }
      }

      const tabs =
        this.tabs.map(
          formatTabData
        )

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

      function updateTabKeyValue (
        [
          key,
          value
        ]
      ) {
        tab[key] = value
      }

      function updateTab () {
        const keysValues =
          Object.entries(
            data
          )

        keysValues.forEach(
          updateTabKeyValue
        )
      }

      if (isUpdateTab) {
        updateTab()

        this.tabs = tabs
      }
    },
    clearTabs () {
      ipcRenderer.send(
        'clear-tabs'
      )
    },
    getElectronStoreTabs () {
      return ipcRenderer.invoke(
        'get-electron-store-key',
        'layout.tabs'
      )
    },
    addTab (
      value
    ) {
      ipcRenderer.send(
        'add-tab',
        value
      )
    },
    getElectronStoreActiveTabId () {
      return ipcRenderer.invoke(
        'get-electron-store-key',
        'layout.activeTabId'
      )
    },
    addNewTab () {
      const uuid = generateKey()

      const {
        path
      } = formatHomeLink()

      const tabData = {
        uuid,
        path
      }

      this.addTab(
        tabData
      )

      this.setActiveTab(
        uuid
      )
    },
    setActiveTab (
      value
    ) {
      ipcRenderer.send(
        'set-active-tab',
        value
      )
    },
    setElectronStoreTabs () {
      this.setElectronStoreData(
        {
          'layout.tabs': this.tabs
        }
      )
    },
    setElectronStoreData (
      value
    ) {
      const dataFormatted =
        JSON.stringify(
          value
        )

      ipcRenderer.invoke(
        'set-electron-store-data',
        dataFormatted
      )
    },
    setElectronStoreActiveTabId (
      value
    ) {
      this.setElectronStoreData(
        {
          'layout.activeTabId':
            this.activeTabId
        }
      )
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
