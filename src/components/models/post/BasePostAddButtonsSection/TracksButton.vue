<template>
  <BaseButton
    class="compact"
    icon="music"
    @click="handleClick"
  />

  <BasePostAddTracksModal
    ref="modal"
    :tracks="tracks"
    @change="handleTracksChange"
  />
</template>

<script>
import BaseButton from '@/buttons/BaseButton.vue'
import BasePostAddTracksModal from '@/modals/post/BasePostAddTracksModal.vue'

export default {
  name: 'TracksButton',
  components: {
    BaseButton,
    BasePostAddTracksModal
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
