<template>
  <BaseAccordionContainer
    :title="findText"
    @open="handleOpen"
    @close="handleClose"
  >
    <BaseTrackSourceSelect
      v-if="isOpen"
      :track-data="trackData"
    />
  </BaseAccordionContainer>
</template>

<script>
import BaseAccordionContainer
  from '@/components/containers/BaseAccordionContainer.vue'
import BaseTrackSourceSelect
  from '@/components/models/track/BaseTrackSourceSelect.vue'

export default {
  name: 'SourceSelect',
  components: {
    BaseAccordionContainer,
    BaseTrackSourceSelect
  },
  props: {
    trackData: Object
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
