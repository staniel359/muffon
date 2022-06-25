<template>
  <RouterLink
    class="ui main-link"
    :to="link"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click.exact.stop="handleClick"
    @click.ctrl.exact.stop="handleCtrlClick"
    @auxclick.exact.stop="handleAuxClick"
  >
    <span
      v-html="text"
    />
  </RouterLink>
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import {
  mapState
} from 'vuex'
import {
  generateKey
} from '*/helpers/utils'

export default {
  name: 'BaseLink',
  props: {
    link: {
      type: Object,
      default () {
        return {}
      }
    },
    text: {
      type: String,
      required: true
    }
  },
  emits: [
    'click',
    'activeChange'
  ],
  computed: {
    ...mapState(
      'layout',
      [
        'isSwitchToNewTab'
      ]
    )
  },
  methods: {
    handleMouseEnter () {
      this.$emit(
        'activeChange',
        true
      )
    },
    handleMouseLeave () {
      this.$emit(
        'activeChange',
        false
      )
    },
    handleClick () {
      this.$emit(
        'click'
      )
    },
    handleCtrlClick () {
      this.openNewTab()
    },
    handleAuxClick () {
      this.openNewTab()
    },
    openNewTab () {
      const tab = this.getTabData()

      ipcRenderer.send(
        'add-tab',
        tab
      )

      if (this.isSwitchToNewTab) {
        ipcRenderer.send(
          'set-active-tab',
          tab.uuid
        )
      }
    },
    getTabData () {
      return {
        uuid: generateKey(),
        path: this.link.path,
        isLoading: true
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
