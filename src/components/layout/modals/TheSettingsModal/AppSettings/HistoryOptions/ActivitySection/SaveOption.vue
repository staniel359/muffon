<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        ref="toggle"
        store-key="history.isSaveActivity"
        :is-checked="isSaveActivityHistory"
        @click="handleToggleClick"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import historyStore from '@/stores/history'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'
import updateProfile from '@/helpers/actions/api/profile/update'

export default {
  name: 'SaveOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      historyStore,
      {
        isSaveActivityHistory: 'isSaveActivity'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.app.history.activity.save'
      )
    },
    profileArgs () {
      return {
        isSaveActivityHistory:
          !this.isSaveActivityHistory
      }
    }
  },
  methods: {
    handleToggleClick () {
      updateProfile(
        this.profileArgs
      ).catch(
        this.handleProfileUpdateError
      )
    },
    handleProfileUpdateError () {
      this.toggleToggle()
    },
    toggleToggle () {
      this.$refs
        .toggle
        .toggle()
    }
  }
}
</script>

<style lang="sass" scoped></style>
