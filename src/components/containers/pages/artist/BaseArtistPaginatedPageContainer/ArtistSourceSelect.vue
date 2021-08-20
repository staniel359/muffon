<template>
  <BaseAccordionContainer
    :title="textFormatted"
    @open="handleOpen"
  >
    <BaseAlbumsSourceSelect
      v-if="isOpen"
      :artistName="artistName"
      @artistDataChange="handleArtistDataChange"
    />
  </BaseAccordionContainer>
</template>

<script>
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
import BaseAlbumsSourceSelect from '@/models/artist/BaseAlbumsSourceSelect.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'ArtistSourceSelect',
  components: {
    BaseAccordionContainer,
    BaseAlbumsSourceSelect
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
    textFormatted () {
      return localize(
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
