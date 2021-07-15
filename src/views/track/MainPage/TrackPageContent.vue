<template>
  <BaseTrackSourceSelect :trackData="trackData" />

  <BaseDivider />

  <MainSection :trackData="trackData" />
  <ExtraSection
    :key="extraSectionKey"
    :trackData="trackData"
  />
</template>

<script>
import BaseTrackSourceSelect from '@/models/track/BaseTrackSourceSelect.vue'
import BaseDivider from '@/BaseDivider.vue'
import MainSection from './TrackPageContent/MainSection.vue'
import ExtraSection from './TrackPageContent/ExtraSection.vue'
import { generateKey } from '#/utils'

export default {
  name: 'TrackPageContent',
  components: {
    BaseTrackSourceSelect,
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
