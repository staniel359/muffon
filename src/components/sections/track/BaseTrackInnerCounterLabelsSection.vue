<template>
  <div
    v-if="isRender"
  >
    <BaseInnerCounterLabelsSection
      v-bind="$attrs"
      :listeners-count="listenersCount"
      :size="size"
      :is-clickable="isClickable"
      @click="handleClick"
    />

    <BaseTrackListenersModal
      v-if="isClickable"
      ref="modal"
      :request-track-data="requestTrackData"
    />
  </div>
</template>

<script>
import {
  defineAsyncComponent
} from 'vue'
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseInnerCounterLabelsSection
  from '@/components/sections/BaseInnerCounterLabelsSection.vue'

const BaseTrackListenersModal =
  defineAsyncComponent(
    () => import(
      '@/components/modals/track/BaseTrackListenersModal.vue'
    )
  )

export default {
  name: 'BaseTrackInnerCounterLabelsSection',
  components: {
    BaseInnerCounterLabelsSection,
    BaseTrackListenersModal
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    isClickable: {
      type: Boolean,
      default: true
    },
    size: String
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isWithInnerCounters'
      ]
    ),
    isRender () {
      return (
        this.isWithInnerCounters &&
          this.listenersCount
      )
    },
    listenersCount () {
      return this.trackData.profiles_count
    },
    requestTrackData () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle
      }
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    }
  },
  methods: {
    handleClick () {
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
