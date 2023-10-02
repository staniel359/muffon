<template>
  <BaseButtonContainer
    class="circular browser-tab middle-aligned main-left-mini-section"
    :class="{
      primary: isActive,
      basic: !isActive
    }"
    :is-invertable="!isActive"
    @click="handleClick"
  >
    <BaseIcon
      class="main-icon main-right-mini-section"
      :is-loading="isLoading"
      :is-error="isError"
      :icon="icon"
    />

    <span
      class="browser-tab-name text-overflow-hidden main-right-small-section"
      :class="{
        active: isActive
      }"
      v-text="tabTitle"
    />

    <BaseClearButton
      class="browser-tab-close-button main-right-small-icon"
      :class="{
        inverted: isActive
      }"
      :is-red="false"
      :is-invertable="!isActive"
      @click.stop="handleCloseButtonClick"
    />
  </BaseButtonContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  ipcRenderer
} from 'electron'
import BaseButtonContainer
  from '@/components/containers/buttons/BaseButtonContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'

export default {
  name: 'BrowserTab',
  components: {
    BaseButtonContainer,
    BaseIcon,
    BaseClearButton
  },
  props: {
    tabData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLoading: true,
      isError: false
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode',
        'activeTabId'
      ]
    ),
    tabId () {
      return this.tabData.uuid
    },
    tabTitle () {
      if (this.isLoading) {
        return this.$t(
          'loading'
        )
      } else if (this.isError) {
        return this.$t(
          'error'
        )
      } else {
        return this.tabData.title
      }
    },
    isActive () {
      return (
        this.tabId ===
          this.activeTabId
      )
    },
    icon () {
      return this.tabData.icon
    }
  },
  mounted () {
    ipcRenderer.on(
      'update-tab',
      this.handleUpdateTab
    )
  },
  methods: {
    handleUpdateTab (
      _,
      {
        tabId,
        isLoading,
        isError
      }
    ) {
      const isCurrentTab = (
        tabId === this.tabId
      )

      if (isCurrentTab) {
        this.isLoading = isLoading
        this.isError = isError
      }
    },
    handleClick () {
      ipcRenderer.send(
        'set-active-tab',
        this.tabId
      )
    },
    handleCloseButtonClick () {
      ipcRenderer.send(
        'delete-tab',
        this.tabId
      )
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/Shared.sass'

.browser-tab
  padding: 0.55rem
  &:hover
    .browser-tab-name
      max-width: unset

.browser-tab-name
  max-width: 150px
  &.active
    @extend .text-bold

.browser-tab-close-button
  padding: 4px !important
  width: unset !important
</style>
