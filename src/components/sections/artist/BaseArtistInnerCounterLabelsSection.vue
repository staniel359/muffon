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

    <BaseArtistListenersModal
      v-if="isClickable"
      ref="modal"
      :artist-name="artistName"
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

const BaseArtistListenersModal =
  defineAsyncComponent(
    () => import(
      '@/components/modals/artist/BaseArtistListenersModal.vue'
    )
  )

export default {
  name: 'BaseArtistInnerCounterLabelsSection',
  components: {
    BaseInnerCounterLabelsSection,
    BaseArtistListenersModal
  },
  props: {
    artistData: {
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
      return this.artistData.profiles_count
    },
    artistName () {
      return this.artistData.name
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
