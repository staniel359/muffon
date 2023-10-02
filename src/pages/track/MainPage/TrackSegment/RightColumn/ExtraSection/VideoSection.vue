<template>
  <div
    ref="section"
  >
    <BaseSearchButton
      model="video"
      :is-active="isShowVideoSelect"
      @click="handleSearchButtonClick"
    />

    <BaseTrackVideoSelect
      v-if="isVideoSelectCalled"
      v-show="isShowVideoSelect"
      class="main-bottom-section"
      :track-data="trackData"
      :is-show="isShowVideoSelect"
      @focus="handleFocus"
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
      isVideoSelectCalled: false,
      isShowVideoSelect: false
    }
  },
  watch: {
    isShowVideoSelect:
      'handleIsShowVideoSelectChange'
  },
  methods: {
    handleIsShowVideoSelectChange (
      value
    ) {
      if (value) {
        this.focus()
      }
    },
    handleSearchButtonClick () {
      this.isVideoSelectCalled = true

      this.isShowVideoSelect =
        !this.isShowVideoSelect
    },
    handleFocus () {
      this.focus()
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
