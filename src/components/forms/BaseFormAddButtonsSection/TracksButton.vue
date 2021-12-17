<template>
  <BaseButton
    class="compact"
    icon="music"
    @click="handleClick"
  />

  <BaseAddTracksModal
    ref="modal"
    :tracks="tracks"
    @change="handleTracksChange"
  />
</template>

<script>
import BaseButton from '@/buttons/BaseButton.vue'
import BaseAddTracksModal from '@/modals/BaseAddTracksModal.vue'

export default {
  name: 'TracksButton',
  components: {
    BaseButton,
    BaseAddTracksModal
  },
  props: {
    tracks: Array
  },
  emits: [
    'change'
  ],
  methods: {
    handleClick () {
      this.$refs.modal.show()
    },
    handleTracksChange (value) {
      this.$emit(
        'change',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
