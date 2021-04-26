<template>
  <BaseButton
    class="tiny compact"
    icon="random"
    :class="{ basic: !isQueueShuffle }"
    @click="handleClick"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseButton from '@/BaseButton.vue'
import { toggleIsShuffle as toggleIsQueueShuffle } from '#/actions/queue'

export default {
  name: 'ShuffleButton',
  components: {
    BaseButton
  },
  computed: {
    ...mapState('queue', {
      isQueueShuffle: 'isShuffle'
    })
  },
  methods: {
    handleClick () {
      toggleIsQueueShuffle()
    }
  }
}
</script>

<style lang="sass" scoped></style>
