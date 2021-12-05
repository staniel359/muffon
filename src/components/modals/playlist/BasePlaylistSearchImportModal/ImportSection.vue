<template>
  <div class="main-library-modal-import-section">
    <SearchList
      :tracks="tracks"
      @change="handleChange"
    />
  </div>

  <BaseSaveButton
    @click="handleSaveButtonClick"
  />
</template>

<script>
import SearchList from './SearchList.vue'
import BaseSaveButton from '@/buttons/BaseSaveButton.vue'

export default {
  name: 'ImportSection',
  components: {
    SearchList,
    BaseSaveButton
  },
  props: {
    tracks: Array
  },
  emits: [
    'change',
    'save'
  ],
  methods: {
    handleChange (value) {
      this.$emit(
        'change',
        value
      )
    },
    handleSaveButtonClick () {
      this.$emit('save')
    }
  }
}
</script>

<style lang="sass" scoped></style>
