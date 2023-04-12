<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="scaleText"
    />
  </div>

  <div class="scale-seeker-container">
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
  mainScaleSeekerOptions
} from '@/helpers/formatters/plugins/semantic'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'ScaleOption',
  components: {
    BaseHeader,
    BaseSeeker
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'scale'
      ]
    ),
    seekerOptions () {
      return mainScaleSeekerOptions(
        {
          start: this.scale
        }
      )
    },
    scaleText () {
      return this.$t(
        'settings.options.app.interface.scale'
      )
    }
  },
  watch: {
    scale: 'handleScaleChange'
  },
  methods: {
    handleMouseUp (
      value
    ) {
      updateGlobalStore(
        {
          'layout.scale': value
        }
      )
    },
    handleScaleChange (
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
.scale-seeker-container
  margin: 1em 0
  padding: 0 1.5em
</style>
