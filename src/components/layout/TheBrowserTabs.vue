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
  computed: {
    ...mapState(
      layoutStore,
      [
        'tabs',
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
