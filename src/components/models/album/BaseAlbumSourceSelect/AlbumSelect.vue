<template>
  <BaseDropdownContainer
    class="main-source-select-item-select"
    :header="headerText"
  >
    <AlbumsList :albums="albums" />
  </BaseDropdownContainer>
</template>

<script>
import BaseDropdownContainer from '@/containers/BaseDropdownContainer.vue'
import AlbumsList from './AlbumSelect/AlbumsList.vue'

export default {
  name: 'AlbumSelect',
  components: {
    BaseDropdownContainer,
    AlbumsList
  },
  props: {
    typeId: {
      type: String,
      required: true
    },
    albums: Array
  },
  computed: {
    headerText () {
      return this.$t(
        `sources.select.${this.typeId}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
