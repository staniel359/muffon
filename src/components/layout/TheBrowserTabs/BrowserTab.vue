<template>
  <BaseButtonContainer
    class="basic circular browser-tab"
    :class="{
      active: isActiveClass
    }"
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
      :is-red="false"
      is-invertable
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
    },
    activeTabId: String
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
        'isDarkMode'
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
    isActiveClass () {
      if (this.isDarkMode) {
        return this.isActive
      } else {
        return !this.isActive
      }
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
  margin-right: 0.5em !important
  &:hover
    .browser-tab-name
      max-width: unset

.browser-tab-icon
  @extend .no-margin
  margin-left: 0.5em !important

.browser-tab-name
  @extend .white-space-no-wrap, .overflow-hidden
  max-width: 150px
  margin-left: 0.75em
  &.active
    @extend .text-bold

.browser-tab-close-button
  margin-left: 0.75em !important
  padding: 4px !important
  width: unset !important
</style>
