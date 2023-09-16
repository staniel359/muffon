<template>
  <BaseButtonContainer
    class="circular browser-tab"
    :class="{
      primary: isActive,
      basic: !isActive
    }"
    :is-invertable="!isActive"
    @click="handleClick"
  >
    <BaseIcon
      class="browser-tab-icon"
      :is-loading="isLoading"
      :is-error="isError"
      :icon="icon"
    />

    <span
      class="browser-tab-name"
      :class="{
        active: isActive
      }"
      v-text="tabTitle"
    />

    <BaseClearButton
      class="browser-tab-close-button"
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
.browser-tab
  @extend .d-flex, .align-items-center
  padding: 0.5em
  &:hover
    .browser-tab-name
      max-width: unset
[dir="ltr"]
  .browser-tab
    margin-right: 0.5em !important
[dir="rtl"]
  .browser-tab
    margin-left: 0.5em !important

.browser-tab-icon
  @extend .no-margin
[dir="ltr"]
  .browser-tab-icon
    margin-left: 0.5em !important
[dir="rtl"]
  .browser-tab-icon
    margin-right: 0.5em !important

.browser-tab-name
  @extend .white-space-no-wrap, .overflow-hidden
  max-width: 150px
  &.active
    @extend .text-bold
[dir="ltr"]
  .browser-tab-name
    margin-left: 0.75em
[dir="rtl"]
  .browser-tab-name
    margin-right: 0.75em

.browser-tab-close-button
  padding: 4px !important
  width: unset !important
[dir="ltr"]
  .browser-tab-close-button
    margin-left: 0.75em !important
[dir="rtl"]
  .browser-tab-close-button
    margin-right: 0.75em !important
</style>
