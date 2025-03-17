<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />
    </div>

    <div class="main-seeker-container">
      <BaseSeeker
        ref="seeker"
        class="bottom aligned labeled ticked with-thumb"
        :options="seekerOptions"
        @mouse-up="handleMouseUp"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseSeeker from '@/components/BaseSeeker.vue'
import {
  transparency as transparencySeekerOptions
} from '@/helpers/formatters/plugins/semantic/options/seeker'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'TransparencyOption',
  components: {
    BaseSettingsOptionHeader,
    BaseSeeker
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'transparency'
      ]
    ),
    seekerOptions () {
      return transparencySeekerOptions(
        {
          start: this.transparency
        }
      )
    },
    optionText () {
      return this.$t(
        'settings.options.app.theme.transparency'
      )
    }
  },
  watch: {
    transparency: 'handleTransparencyChange'
  },
  methods: {
    handleMouseUp (
      value
    ) {
      updateGlobalStore(
        {
          'layout.transparency': value
        }
      )
    },
    handleTransparencyChange (
      value
    ) {
      this.setSeekerValue(
        value
      )
    },
    setSeekerValue (
      value
    ) {
      this.$refs
        .seeker
        .setValue(
          value
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
