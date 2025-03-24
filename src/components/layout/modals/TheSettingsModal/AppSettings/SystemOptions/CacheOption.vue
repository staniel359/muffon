<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="system.isWithCache"
        :is-checked="isWithCache"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import systemStore from '@/stores/system'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'CacheOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  mixins: [
    notificationMixin
  ],
  computed: {
    ...mapState(
      systemStore,
      [
        'isWithCache'
      ]
    ),
    optionText () {
      return this.$t(
        'settings.options.app.system.cache.enable'
      )
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.restartToApply'
      )
    }
  },
  watch: {
    isWithCache: 'handleIsWithCacheChange'
  },
  methods: {
    handleIsWithCacheChange () {
      this.notifySuccess()
    }
  }
}
</script>

<style lang="sass" scoped></style>
