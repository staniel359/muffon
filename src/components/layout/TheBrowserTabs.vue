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
import electronStore from '#/plugins/electronStore'
import BaseMenuContainer from '@/components/containers/BaseMenuContainer.vue'
import BrowserTab from './TheBrowserTabs/BrowserTab.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import {
  generateKey
} from '#/helpers/utils'
import {
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
  computed: {
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
      'add-tab',
      this.handleAddTab
    )

    ipcRenderer.on(
      'set-active-tab',
      this.handleSetActiveTab
    )

    ipcRenderer.on(
      'remove-tab',
      this.handleRemoveTab
    )

    ipcRenderer.on(
      'update-tab',
      this.handleUpdateTab
    )
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
        this.setElectronStoreTabs(
          value
        )
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
    handleSetActiveTab (
      _,
      tabId
    ) {
      this.activeTabId = tabId

      this.setElectronStoreActiveTabId(
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
    addTabsFromElectronStore () {
      this.electronStoreTabs
        .forEach(
          this.addTab
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
    setActiveTab () {
      ipcRenderer.send(
        'set-active-tab',
        this.electronStoreActiveTabId
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

      ipcRenderer.send(
        'set-active-tab',
        uuid
      )
    },
    setElectronStoreTabs (
      value
    ) {
      electronStore.set(
        {
          'layout.tabs': value
        }
      )
    },
    setElectronStoreActiveTabId (
      value
    ) {
      electronStore.set(
        {
          'layout.activeTabId': value
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
