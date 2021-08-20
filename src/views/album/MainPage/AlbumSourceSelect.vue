<template>
  <BaseAccordionContainer
    :title="textFormatted"
    @open="handleOpen"
  >
    <BaseAlbumSourceSelect
      v-if="isOpen"
      :albumData="albumData"
    />
  </BaseAccordionContainer>
</template>

<script>
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
import BaseAlbumSourceSelect from '@/models/album/BaseAlbumSourceSelect.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'AlbumSourceSelect',
  components: {
    BaseAccordionContainer,
    BaseAlbumSourceSelect
  },
  props: {
    albumData: Object
  },
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
