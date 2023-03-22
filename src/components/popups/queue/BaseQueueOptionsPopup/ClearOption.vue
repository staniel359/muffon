<template>
  <BaseOption
    icon="delete"
    :text="clearText"
    is-icon-red
    @click="handleClick"
  />
</template>

<script>
import BaseOption from '@/components/popups/options/BaseOption.vue'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'ClearOption',
  components: {
    BaseOption
  },
  computed: {
    clearText () {
      return this.$t(
        'actions.clear'
      )
    }
  },
  methods: {
    handleClick () {
      updateGlobalStore(
        {
          'queue.currentTrackId': null,
          'queue.tracks': [],
          'queue.tracksShuffled': [],
          'queue.isShuffle': false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
