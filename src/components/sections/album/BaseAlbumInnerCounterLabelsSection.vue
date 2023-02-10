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

    <BaseAlbumListenersModal
      v-if="isClickable"
      ref="modal"
      :request-album-data="requestAlbumData"
    />
  </template>
</template>

<script>
import {
  defineAsyncComponent
} from 'vue'
import BaseInnerCounterLabelsSection
  from '@/components/sections/BaseInnerCounterLabelsSection.vue'

const BaseAlbumListenersModal =
  defineAsyncComponent(
    () => import(
      '@/components/modals/album/BaseAlbumListenersModal.vue'
    )
  )

export default {
  name: 'BaseAlbumInnerCounterLabelsSection',
  components: {
    BaseInnerCounterLabelsSection,
    BaseAlbumListenersModal
  },
  props: {
    albumData: {
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
      return this.albumData.profiles_count
    },
    requestAlbumData () {
      return {
        artistName: this.artistName,
        albumTitle: this.albumTitle
      }
    },
    artistName () {
      return this.albumData.artist.name
    },
    albumTitle () {
      return this.albumData.title
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
