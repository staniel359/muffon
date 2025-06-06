<template>
  <BaseButtonContainer
    class="circular base-browser-tab middle-aligned main-left-mini-section"
    :class="{
      primary: isActive,
      basic: !isActive
    }"
    :is-invertable="!isActive"
    @click="handleClick"
    @auxclick.stop="handleAuxClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <BaseIcon
      class="main-right-extrasmall-icon main-left-small-icon"
      :is-loading="isLoading"
      :is-error="isError"
      :icon="icon"
    />

    <BaseTickerContainer
      ref="ticker"
      :key="key"
      class="tab-name text-overflow-hidden"
      :class="{
        active: isActive
      }"
      :is-enabled="false"
    >
      {{ tabTitle }}
    </BaseTickerContainer>

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
import BaseButtonContainer
  from '@/components/containers/buttons/BaseButtonContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseTickerContainer
  from '@/components/containers/BaseTickerContainer.vue'
import {
  generateKey,
  isMiddleClick
} from '@/helpers/utils'

export default {
  name: 'BrowserTab',
  components: {
    BaseButtonContainer,
    BaseIcon,
    BaseTickerContainer
  },
  props: {
    tabData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      key: null,
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
  watch: {
    tabTitle: 'handleTabTitleChange'
  },
  mounted () {
    window
      .mainProcess
      .addCommandHandler(
        'update-tab',
        this.handleUpdateTab
      )
  },
  methods: {
    handleTabTitleChange () {
      this.key = generateKey()
    },
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
      window
        .mainProcess
        .sendCommand(
          'set-active-tab',
          this.tabId
        )
    },
    handleCloseButtonClick () {
      this.callTabClose()
    },
    handleAuxClick (
      event
    ) {
      if (isMiddleClick(
        event
      )) {
        this.callTabClose()
      }
    },
    handleMouseEnter () {
      this.$refs
        .ticker
        .activate()
    },
    handleMouseLeave () {
      this.$refs
        .ticker
        .deactivate()
    },
    callTabClose () {
      window
        .mainProcess
        .sendCommand(
          'delete-tab',
          this.tabId
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
