<template>
  <div
    ref="section"
  >
    <BaseSearchButton
      model="lyrics"
      :is-active="isShowLyricsSelect"
      @click="handleSearchButtonClick"
    />

    <BaseTrackLyricsSelect
      v-if="isLyricsSelectCalled"
      v-show="isShowLyricsSelect"
      class="main-bottom-section"
      :track-data="trackData"
      @focus="handleFocus"
    />
  </div>
</template>

<script>
import BaseSearchButton from '@/components/buttons/BaseSearchButton.vue'
import BaseTrackLyricsSelect
  from '@/components/models/track/BaseTrackLyricsSelect.vue'
import {
  focusOnPageElement
} from '@/helpers/actions/layout'

export default {
  name: 'LyricsSection',
  components: {
    BaseSearchButton,
    BaseTrackLyricsSelect
  },
  props: {
    trackData: Object
  },
  data () {
    return {
      isLyricsSelectCalled: false,
      isShowLyricsSelect: false
    }
  },
  watch: {
    isShowLyricsSelect:
      'handleIsShowLyricsSelectChange'
  },
  methods: {
    handleIsShowLyricsSelectChange (
      value
    ) {
      if (value) {
        this.focus()
      }
    },
    handleSearchButtonClick () {
      this.isLyricsSelectCalled = true

      this.isShowLyricsSelect =
        !this.isShowLyricsSelect
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
