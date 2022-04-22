<template>
  <BaseButtonContainer
    class="basic browser-tab"
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

    <BaseButton
      :class="[
        'basic mini compact circular',
        'browser-tab-close-button'
      ]"
      icon="close"
      @click.stop="handleRemoveButtonClick"
    />
  </BaseButtonContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  ipcRenderer
} from 'electron'
import BaseButtonContainer
  from '*/components/containers/buttons/BaseButtonContainer.vue'
import BaseIcon from '*/components/BaseIcon.vue'
import BaseButton from '*/components/buttons/BaseButton.vue'

export default {
  name: 'BrowserTab',
  components: {
    BaseButtonContainer,
    BaseIcon,
    BaseButton
  },
  props: {
    tabData: {
      type: Object,
      required: true
    },
    activeTabId: String
  },
  computed: {
    ...mapState(
      'layout',
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
    isLoading () {
      return this.tabData.isLoading
    },
    isError () {
      return this.tabData.isError
    },
    icon () {
      return this.tabData.icon
    }
  },
  methods: {
    handleClick () {
      ipcRenderer.send(
        'set-top-tab',
        this.tabId
      )
    },
    handleRemoveButtonClick () {
      ipcRenderer.send(
        'remove-tab',
        this.tabId
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.browser-tab
  @extend .d-flex, .align-items-center, .cursor-pointer, .no-margin
  padding: 0.5em
  margin-right: 0.5em !important
  max-width: 210px

.browser-tab-icon
  @extend .no-margin
  margin-left: 0.25em !important

.browser-tab-name
  @extend .white-space-no-wrap, .overflow-hidden
  width: 100%
  margin-left: 0.5em
  flex: 1 0
  &.active
    font-weight: 700

.browser-tab-close-button
  @extend .no-margin
  margin-left: 0.5em !important
  padding: 4px !important
</style>
