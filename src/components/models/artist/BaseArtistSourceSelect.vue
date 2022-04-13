<template>
  <BaseAccordionContainer
    :title="findText"
    @open="handleOpen"
  >
    <BaseArtistAlbumsSourceSelect
      v-if="isOpen"
      :artist-name="artistName"
      @artist-data-change="handleArtistDataChange"
    />
  </BaseAccordionContainer>
</template>

<script>
import BaseAccordionContainer
  from '*/components/containers/BaseAccordionContainer.vue'
import BaseArtistAlbumsSourceSelect
  from '*/components/models/artist/BaseArtistAlbumsSourceSelect.vue'

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
        'actions.find.sources'
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
