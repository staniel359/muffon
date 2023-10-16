<template>
  <BaseMenuContainer
    class="top fixed the-browser-tabs middle-aligned no-shadow overflow-y-auto"
  >
    <BrowserTab
      v-for="tabData in tabs"
      :key="tabData.uuid"
      :tab-data="tabData"
    />

    <BaseButton
      class="basic circular compact simple"
      icon="add"
      @click="handleAddTabButtonClick"
    />
  </BaseMenuContainer>
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseMenuContainer from '@/components/containers/BaseMenuContainer.vue'
import BrowserTab from './TheBrowserTabs/BrowserTab.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import {
  generateKey
} from '@/helpers/utils'
import {
  home as formatHomeLink
} from '@/helpers/formatters/links'
import newTabMixin from '@/mixins/newTabMixin'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'TheBrowserTabs',
  components: {
    BaseMenuContainer,
    BaseButton,
    BrowserTab
  },
  mixins: [
    newTabMixin
  ],
  data () {
    return {
      tabs: []
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'activeTabId'
      ]
    ),
    tabsCount () {
      return this.tabs.length
    },
    defaultPath () {
      return formatHomeLink().path
    }
  },
  watch: {
    tabsCount: 'handleTabsCountChange'
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

    if (this.tabsCount) {
      this.setupTabs()

      this.setupActiveTab()
    } else {
      this.addNewTab()
    }
  },
  unmounted () {
    this.clearTabs()
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

        this.tabs = tabs
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

        this.tabs = tabs
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

      this.tabs = tabs
    },
    handleTabsCountChange (
      value
    ) {
      if (!value) {
        this.addNewTab()
      }
    },
    handleAddTabButtonClick () {
      this.addNewTab()
    },
    setupTabs () {
      this.tabs.forEach(
        this.addTab
      )
    },
    setupActiveTab () {
      if (this.activeTabId) {
        this.setActiveTab(
          this.activeTabId
        )
      }
    },
    addNewTab () {
      const tabData = {
        uuid: generateKey(),
        path: this.defaultPath
      }

      this.addTab(
        tabData
      )

      this.setActiveTab(
        tabData.uuid
      )
    },
    clearTabs () {
      ipcRenderer.send(
        'clear-tabs'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
