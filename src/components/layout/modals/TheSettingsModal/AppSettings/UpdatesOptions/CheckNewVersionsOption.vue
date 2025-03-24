<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="updates.isCheckForNewVersions"
        :is-checked="isCheckForNewVersions"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import updatesStore from '@/stores/updates'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'CheckNewVersionsOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  mixins: [
    notificationMixin
  ],
  computed: {
    ...mapState(
      updatesStore,
      [
        'isCheckForNewVersions'
      ]
    ),
    optionText () {
      return this.$t(
        'settings.options.app.updates.check'
      )
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.restartToApply'
      )
    }
  },
  watch: {
    isCheckForNewVersions:
      'handleIsCheckForNewVersionsChange'
  },
  methods: {
    handleIsCheckForNewVersionsChange () {
      this.notifySuccess()
    }
  }
}
</script>

<style lang="sass" scoped></style>
