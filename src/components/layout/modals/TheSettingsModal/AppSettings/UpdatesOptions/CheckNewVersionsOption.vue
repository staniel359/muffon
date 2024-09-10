<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="checkNewVersionsText"
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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'CheckNewVersionsOption',
  components: {
    BaseHeader,
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
    checkNewVersionsText () {
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
