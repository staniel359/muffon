<template>
  <div
    class="item"
    @click="handleClick"
  >
    <BaseIcon
      icon="red close"
    />

    {{ clearText }}
  </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'ClearOption',
  components: {
    BaseIcon
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
