<template>
  <div
    class="item"
    :data-value="code"
    @click="handleClick"
    v-text="text"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'LanguageOption',
  props: {
    localeData: {
      type: Object,
      required: true
    }
  },
  computed: {
    code () {
      return this.localeData.code
    },
    text () {
      return this.localeData.text
    }
  },
  methods: {
    handleClick () {
      ipcRenderer.send(
        'set-language',
        this.code
      )

      updateGlobalStore(
        {
          'profile.language': this.code
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
