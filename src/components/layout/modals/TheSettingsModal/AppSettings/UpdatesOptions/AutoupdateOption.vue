<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
        :is-beta="isAutoupdateBeta"
      />

      <BaseToggle
        store-key="updates.isAutoupdateEnabled"
        :class="{
          disabled: isDisabled
        }"
        :is-checked="isAutoupdateEnabled"
      />
    </div>
  </div>

  <AutoupdateBetaWarningMessage
    v-if="isShowBetaWarningMessage"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import updatesStore from '@/stores/updates'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'
import AutoupdateBetaWarningMessage
  from './AutoupdateOption/AutoupdateBetaWarningMessage.vue'
import notificationMixin from '@/mixins/notificationMixin'
import {
  isLinux
} from '@/helpers/utils'

export default {
  name: 'AutoupdateOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle,
    AutoupdateBetaWarningMessage
  },
  mixins: [
    notificationMixin
  ],
  computed: {
    ...mapState(
      updatesStore,
      [
        'isCheckForNewVersions',
        'isAutoupdateEnabled',
        'isAutoupdateBeta'
      ]
    ),
    optionText () {
      return this.$t(
        'settings.options.app.updates.auto'
      )
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.restartToApply'
      )
    },
    isDisabled () {
      return !this.isCheckForNewVersions
    },
    isShowBetaWarningMessage () {
      return (
        this.isAutoupdateBeta && isLinux
      )
    }
  },
  watch: {
    isAutoupdateEnabled:
      'handleIsAutoupdateEnabledChange'
  },
  methods: {
    handleIsAutoupdateEnabledChange () {
      this.notifySuccess()
    }
  }
}
</script>

<style lang="sass" scoped></style>
