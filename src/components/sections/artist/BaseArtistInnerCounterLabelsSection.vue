<template>
  <template
    v-if="listenersCount"
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
  </template>
</template>

<script>
import {
  defineAsyncComponent
} from 'vue'
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
