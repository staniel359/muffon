<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <div class="middle-aligned option-header">
        <BaseHeader
          tag="h4"
          :text="autoupdateText"
        />

        <BaseLabel
          v-if="isAutoupdateBeta"
          class="primary small circular main-right-small-section"
          text="Beta"
          :is-invertable="false"
        />
      </div>

      <BaseToggle
        store-key="updates.isAutoupdateEnabled"
        :class="{
          disabled: isDisabled
        }"
        :is-checked="isAutoupdateEnabled"
      />
    </div>
  </div>

  <AutoupdateWarningMessage
    v-if="isAutoupdateBeta"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import updatesStore from '@/stores/updates'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'
import BaseLabel from '@/components/labels/BaseLabel.vue'
import AutoupdateWarningMessage
  from './AutoupdateOption/AutoupdateWarningMessage.vue'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'AutoupdateOption',
  components: {
    BaseHeader,
    BaseToggle,
    BaseLabel,
    AutoupdateWarningMessage
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
    autoupdateText () {
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
