<template>
  <div class="dimmable blurring">
    <div
      ref="dimmer"
      class="ui page dimmer"
      :class="{
        inverted: !isDarkMode
      }"
      @click="handleClick"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  set as setDimmer,
  toggle as toggleDimmer
} from '@/helpers/actions/plugins/semantic/dimmer'
import {
  main as mainDimmerOptions
} from '@/helpers/formatters/plugins/semantic/options/dimmer'

export default {
  name: 'BaseDimmer',
  emits: [
    'click'
  ],
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    )
  },
  mounted () {
    setDimmer(
      this.$refs.dimmer,
      mainDimmerOptions()
    )
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    },
    toggle (
      value
    ) {
      toggleDimmer(
        this.$refs.dimmer,
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
