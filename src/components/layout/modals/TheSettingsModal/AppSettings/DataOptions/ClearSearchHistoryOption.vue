<template>
  <div class="option">
    <div class="option-header">
      <BaseButton
        class="red circular option-button"
        icon="delete"
        :class="{
          loading: isLoading,
          disabled: isLoading
        }"
        :text="clearText"
        :is-invertable="false"
        @click="handleClick"
      />
    </div>
  </div>
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import BaseButton from '@/components/buttons/BaseButton.vue'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'ClearSearchHistoryOption',
  components: {
    BaseButton
  },
  mixins: [
    notificationMixin
  ],
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    clearText () {
      return this.$t(
        'settings.options.app.data.clear.searchHistory'
      )
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.cleared.searchHistory'
      )
    }
  },
  methods: {
    async handleClick () {
      this.isLoading = true

      await this.clearHistory()

      this.isLoading = false

      this.notifySuccess()
    },
    async clearHistory () {
      await ipcRenderer.invoke(
        'delete-electron-store-key',
        'history.search'
      )

      await ipcRenderer.invoke(
        'delete-electron-store-key',
        'history.librarySearch'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
