<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionButton
        :text="buttonText"
        :is-loading="isLoading"
        :is-disabled="isDisabled"
        is-delete
        @click="handleClick"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import systemStore from '@/stores/system'
import BaseSettingsOptionButton
  from '@/components/buttons/settings/BaseSettingsOptionButton.vue'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'ClearCacheOption',
  components: {
    BaseSettingsOptionButton
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
    ...mapState(
      systemStore,
      [
        'isWithCache'
      ]
    ),
    buttonText () {
      return this.$t(
        'settings.options.app.system.cache.clear'
      )
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.cleared.cache'
      )
    },
    isDisabled () {
      return (
        !this.isWithCache ||
          this.isLoading
      )
    }
  },
  methods: {
    handleClick () {
      this.clearCache()
    },
    async clearCache () {
      this.isLoading = true

      await window
        .mainProcess
        .sendAsyncCommand(
          'clear-cache'
        )

      this.isLoading = false

      this.notifySuccess()
    }
  }
}
</script>

<style lang="sass" scoped></style>
