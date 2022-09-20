<template>
  <div class="track-page-right-column">
    <MainSection
      :track-data="trackData"
    />

    <ExtraSection
      :key="key"
      :track-data="trackData"
      :request-track-data="requestTrackData"
    />
  </div>
</template>

<script>
import MainSection from './RightColumn/MainSection.vue'
import ExtraSection from './RightColumn/ExtraSection.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'RightColumn',
  components: {
    MainSection,
    ExtraSection
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    requestTrackData: Object
  },
  data () {
    return {
      key: null
    }
  },
  watch: {
    trackData: 'handleTrackDataChange'
  },
  methods: {
    handleTrackDataChange () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped>
.track-page-right-column
  @extend .flex-full
  margin-left: 1em
</style>
