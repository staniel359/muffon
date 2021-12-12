<template>
  <BaseAccordionContainer
    :title="findText"
    @open="handleOpen"
  >
    <BaseArtistAlbumsSourceSelect
      v-if="isOpen"
      :artistName="artistName"
      @artistDataChange="handleArtistDataChange"
    />
  </BaseAccordionContainer>
</template>

<script>
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
import BaseArtistAlbumsSourceSelect
  from '@/models/artist/BaseArtistAlbumsSourceSelect.vue'

export default {
  name: 'BaseArtistSourceSelect',
  components: {
    BaseAccordionContainer,
    BaseArtistAlbumsSourceSelect
  },
  props: {
    artistName: String
  },
  emits: [
    'artistDataChange'
  ],
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    findText () {
      return this.$t(
        'shared.sources.find'
      )
    }
  },
  methods: {
    handleOpen () {
      this.isOpen = true
    },
    handleArtistDataChange () {
      this.$emit(
        'artistDataChange'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
