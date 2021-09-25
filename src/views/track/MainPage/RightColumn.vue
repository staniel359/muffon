<template>
  <div class="track-page-right-column">
    <MainSection
      :trackData="trackData"
    />

    <ExtraSection
      :key="key"
      :trackData="trackData"
    />
  </div>
</template>

<script>
import MainSection from './RightColumn/MainSection.vue'
import ExtraSection from './RightColumn/ExtraSection.vue'
import { generateKey } from '#/utils'

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
    }
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
