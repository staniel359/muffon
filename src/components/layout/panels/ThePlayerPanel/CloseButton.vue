<template>
  <BaseClearButton
    @click="handleClearButtonClick"
  />
</template>

<script>
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'CloseButton',
  components: {
    BaseClearButton
  },
  methods: {
    handleClearButtonClick () {
      updateGlobalStore(
        {
          'player.playing': null
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
