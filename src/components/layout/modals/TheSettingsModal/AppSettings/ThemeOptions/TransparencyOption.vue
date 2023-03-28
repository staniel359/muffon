<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="transparencyText"
    />
  </div>

  <div class="transparency-seeker-container">
    <BaseSeeker
      ref="seeker"
      class="bottom aligned labeled ticked with-thumb"
      :options="seekerOptions"
      @mouse-up="handleMouseUp"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseSeeker from '@/components/BaseSeeker.vue'
import {
  mainTransparencySeekerOptions
} from '@/helpers/formatters/semantic'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'TransparencyOption',
  components: {
    BaseHeader,
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
      return mainTransparencySeekerOptions(
        {
          start: this.transparency
        }
      )
    },
    transparencyText () {
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

<style lang="sass" scoped>
.transparency-seeker-container
  margin: 1em 0
  padding: 0 1.5em
</style>
