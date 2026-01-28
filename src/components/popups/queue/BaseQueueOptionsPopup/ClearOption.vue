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
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'ClearOption',
  components: {
    BaseOption
  },
  inject: [
    'hidePopup'
  ],
  computed: {
    clearText () {
      return this.$t(
        'actions.clear'
      )
    }
  },
  methods: {
    handleClick () {
      this.hidePopup()

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
