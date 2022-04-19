<template>
  <BaseButtonContainer
    class="basic browser-tab"
    :class="{
      active: isActiveClass
    }"
    @click="handleClick"
  >
    <div class="browser-tab-content">
      <BaseIcon
        v-if="icon"
        class="browser-tab-icon"
        :icon="icon"
      />

      <span
        class="browser-tab-name"
        :class="{
          active: isActive
        }"
        v-text="tabTitle"
      />
    </div>

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
      return (
        this.tabData.title ||
          this.loadingText
      )
    },
    loadingText () {
      return this.$t(
        'loading'
      )
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
  max-width: 250px

.browser-tab-content
  @extend .overflow-hidden, .d-flex, .align-items-center

.browser-tab-icon
  @extend .no-margin
  margin-left: 0.5em !important

.browser-tab-name
  @extend .white-space-no-wrap
  margin-left: 0.5em
  &.active
    font-weight: 700

.browser-tab-close-button
  @extend .no-margin
  margin-left: 0.5em !important
  padding: 4px !important
</style>
