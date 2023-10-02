<template>
  <BaseButton
    class="small basic circular"
    icon="music"
    @click="handleClick"
  />

  <SearchModal
    ref="modal"
    :artists="artists"
    :albums="albums"
    :tracks="tracks"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import SearchModal from './MusicButton/SearchModal.vue'

export default {
  name: 'MusicButton',
  components: {
    BaseButton,
    SearchModal
  },
  props: {
    artists: Array,
    albums: Array,
    tracks: Array
  },
  methods: {
    handleClick () {
      this.showModal()
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
