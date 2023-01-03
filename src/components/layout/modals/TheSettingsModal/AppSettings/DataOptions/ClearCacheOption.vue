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
        'settings.options.app.data.clear.cache'
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
