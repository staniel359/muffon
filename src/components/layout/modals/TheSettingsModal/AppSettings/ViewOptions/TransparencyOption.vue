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
      class="bottom aligned labeled with-thumb"
      :options="seekerOptions"
      @init="handleInit"
      @mouse-up="handleMouseUp"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseSeeker from '*/components/BaseSeeker.vue'
import {
  mainTransparencySeekerOptions
} from '*/helpers/data/plugins/semantic'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'
import {
  setSeekerValue
} from '*/helpers/actions/plugins/semantic'

export default {
  name: 'TransparencyOption',
  components: {
    BaseHeader,
    BaseSeeker
  },
  data () {
    return {
      seeker: null
    }
  },
  computed: {
    ...mapState(
      'layout',
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
        'settings.options.app.view.transparency'
      )
    }
  },
  watch: {
    transparency: 'handleTransparencyChange'
  },
  methods: {
    handleInit (
      element
    ) {
      this.seeker = element
    },
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
      setSeekerValue(
        this.seeker,
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
