<template>
  <BaseDropdownContainer
    class="main-source-select-item-select"
    :header="headerFormatted"
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
    headerFormatted () {
      return this.$t(
        `shared.sources.select.${this.typeId}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
