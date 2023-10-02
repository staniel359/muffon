<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <div class="option-header">
        <BaseButton
          class="red circular option-button"
          left-icon="delete"
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
  </div>
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import BaseButton from '@/components/buttons/BaseButton.vue'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'ClearCacheOption',
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
        'settings.options.app.other.clearCache'
      )
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.cleared.cache'
      )
    }
  },
  methods: {
    handleClick () {
      this.clearCache()
    },
    async clearCache () {
      this.isLoading = true

      await ipcRenderer.invoke(
        'clear-cache'
      )

      this.isLoading = false

      this.notifySuccess()
    }
  }
}
</script>

<style lang="sass" scoped></style>
