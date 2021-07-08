<template>
  <TrackSourceSelect :trackData="trackData" />

  <BaseDivider />

  <MainSection :trackData="trackData" />
  <ExtraSection
    :key="extraSectionKey"
    :trackData="trackData"
  />
</template>

<script>
import TrackSourceSelect from './TrackPageContent/TrackSourceSelect.vue'
import BaseDivider from '@/BaseDivider.vue'
import MainSection from './TrackPageContent/MainSection.vue'
import ExtraSection from './TrackPageContent/ExtraSection.vue'
import { generateKey } from '#/utils'

export default {
  name: 'TrackPageContent',
  components: {
    TrackSourceSelect,
    BaseDivider,
    MainSection,
    ExtraSection
  },
  props: {
    trackData: Object
  },
  data () {
    return {
      extraSectionKey: null
    }
  },
  watch: {
    trackData: 'handleTrackDataChange'
  },
  methods: {
    handleTrackDataChange () {
      this.extraSectionKey = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
