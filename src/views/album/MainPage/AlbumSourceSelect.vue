<template>
  <BaseAccordionContainer
    :title="findText"
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
    findText () {
      return this.$t(
        'actions.find.sources'
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
