<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <div class="option-header">
        <BaseButton
          class="red circular option-button"
          left-icon="delete"
          :class="{
            loading: isLoading,
            disabled: isDisabled
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
  mapState
} from 'pinia'
import systemStore from '@/stores/system'
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
    ...mapState(
      systemStore,
      [
        'isWithCache'
      ]
    ),
    clearText () {
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
