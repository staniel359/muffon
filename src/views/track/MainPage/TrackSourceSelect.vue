<template>
  <BaseAccordionContainer
    :title="textFormatted"
    @open="handleOpen"
  >
    <BaseTrackSourceSelect
      v-if="isOpen"
      :trackData="trackData"
    />
  </BaseAccordionContainer>
</template>

<script>
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
import BaseTrackSourceSelect from '@/models/track/BaseTrackSourceSelect.vue'

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
    textFormatted () {
      return this.$t(
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
