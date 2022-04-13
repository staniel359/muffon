<template>
  <BaseAccordionContainer
    :title="findText"
    @open="handleOpen"
  >
    <BaseTrackSourceSelect
      v-if="isOpen"
      :track-data="trackData"
    />
  </BaseAccordionContainer>
</template>

<script>
import BaseAccordionContainer
  from '*/components/containers/BaseAccordionContainer.vue'
import BaseTrackSourceSelect
  from '*/components/models/track/BaseTrackSourceSelect.vue'

export default {
  name: 'TrackSourceSelect',
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
