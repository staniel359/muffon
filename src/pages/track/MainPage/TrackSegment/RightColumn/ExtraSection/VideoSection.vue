<template>
  <div
    ref="section"
  >
    <BaseSearchButton
      model="video"
      :is-active="isActive"
      @click="handleSearchButtonClick"
    />

    <BaseTrackVideoSelect
      v-if="isActive"
      class="main-bottom-section"
      :track-data="trackData"
    />
  </div>
</template>

<script>
import BaseSearchButton from '@/components/buttons/BaseSearchButton.vue'
import BaseTrackVideoSelect
  from '@/components/models/track/BaseTrackVideoSelect.vue'
import {
  focusOnPageElement
} from '@/helpers/actions/layout'

export default {
  name: 'VideoSection',
  components: {
    BaseSearchButton,
    BaseTrackVideoSelect
  },
  props: {
    trackData: Object
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    isRenderVideoSelect () {
      return this.isActive
    }
  },
  watch: {
    isActive: 'handleIsActiveChange'
  },
  methods: {
    handleIsActiveChange (
      value
    ) {
      if (value) {
        this.focus()
      }
    },
    handleSearchButtonClick () {
      this.isActive = !this.isActive
    },
    focus () {
      focusOnPageElement(
        this.$refs.section
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
