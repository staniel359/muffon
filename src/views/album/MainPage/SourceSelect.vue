<template>
  <BaseAccordionContainer
    :title="findText"
    @open="handleOpen"
    @close="handleClose"
  >
    <BaseAlbumSourceSelect
      v-if="isOpen"
      :album-data="albumData"
    />
  </BaseAccordionContainer>
</template>

<script>
import BaseAccordionContainer
  from '*/components/containers/BaseAccordionContainer.vue'
import BaseAlbumSourceSelect
  from '*/components/models/album/BaseAlbumSourceSelect.vue'

export default {
  name: 'SourceSelect',
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
    handleClose () {
      this.isOpen = false
    }
  }
}
</script>

<style lang="sass" scoped></style>
