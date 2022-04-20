<template>
  <BaseButton
    class="basic compact"
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
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseAddTracksModal from '*/components/modals/BaseAddTracksModal.vue'

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
      this.showModal()
    },
    handleTracksChange (
      value
    ) {
      this.$emit(
        'change',
        value
      )
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
