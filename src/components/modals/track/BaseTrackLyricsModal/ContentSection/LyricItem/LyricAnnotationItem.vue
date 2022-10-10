<template>
  <span
    ref="annotation"
    :class="{
      'lyric-annotation-item':
        isLyricsWithAnnotations,
      inverted: isDarkMode
    }"
  >
    <span
      v-for="(lyric, index) in lyrics"
      :key="index"
      v-text="lyric"
    />
  </span>

  <span class="popup-container">
    <BaseAnnotationPopup
      ref="popup"
      :is-called="isCalled"
      :annotation-id="annotationId"
      @annotation-data-change="handleAnnotationDataChange"
    />
  </span>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseAnnotationPopup from '@/components/popups/BaseAnnotationPopup.vue'
import {
  setPopup,
  repositionPopup,
  destroyPopup
} from '@/helpers/actions/plugins/semantic'
import {
  annotationPopupOptions
} from '@/helpers/data/plugins/semantic'

export default {
  name: 'LyricAnnotationItem',
  components: {
    BaseAnnotationPopup
  },
  props: {
    lyricData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isCalled: false
    }
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    ...mapState(
      'lyrics',
      {
        isLyricsWithAnnotations:
          'isWithAnnotations'
      }
    ),
    lyrics () {
      return this.lyricData.text
    },
    annotationId () {
      return this.lyricData.annotation_id.toString()
    },
    element () {
      return this.$refs.annotation
    },
    popupOptions () {
      return annotationPopupOptions(
        {
          html: this.popup,
          onShow: this.handleShow
        }
      )
    },
    popup () {
      return this.$refs
        .popup
        .$refs
        .segment
        .$refs
        .segment
    }
  },
  watch: {
    isLyricsWithAnnotations: {
      immediate: true,
      handler:
        'handleIsLyricsWithAnnotationsChange'
    },
    isDarkMode: 'handleIsDarkModeChange'
  },
  methods: {
    async handleIsLyricsWithAnnotationsChange (
      value
    ) {
      await this.$nextTick()

      this.toggleSetup(
        value
      )
    },
    handleShow () {
      this.isCalled = true
    },
    async handleAnnotationDataChange () {
      await this.$nextTick()

      this.reposition()
    },
    handleIsDarkModeChange () {
      this.initialize()
    },
    toggleSetup (
      value
    ) {
      if (value) {
        this.initialize()
      } else {
        this.destroy()
      }
    },
    initialize () {
      setPopup(
        this.element,
        this.popupOptions
      )
    },
    reposition () {
      repositionPopup(
        this.element
      )
    },
    destroy () {
      destroyPopup(
        this.element
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.lyric-annotation-item
  @extend .cursor-pointer
  background: $colorGrey
  &.inverted
    background: $colorGreyInverted
  &:hover
    background: $colorBaseLight
    color: $colorWhite
    &.inverted
      background: $colorBase

.popup-container
  @extend .d-inline-block
</style>
