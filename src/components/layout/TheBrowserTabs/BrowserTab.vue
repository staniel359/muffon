<template>
  <BaseButtonContainer
    class="circular base-browser-tab middle-aligned main-left-mini-section"
    :class="{
      primary: isActive,
      basic: !isActive
    }"
    :is-invertable="!isActive"
    @click="handleClick"
  >
    <BaseIcon
      class="main-right-extrasmall-icon main-left-small-icon"
      :is-loading="isLoading"
      :is-error="isError"
      :icon="icon"
    />

    <span
      class="tab-name text-overflow-hidden"
      :class="{
        active: isActive
      }"
      v-text="tabTitle"
    />

    <BaseIcon
      class="close-icon main-right-small-icon"
      icon="close"
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

export default {
  name: 'BrowserTab',
  components: {
    BaseButtonContainer,
    BaseIcon
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

<style lang="sass" scoped></style>
