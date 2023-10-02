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

    <BaseAlbumListenersModal
      v-if="isClickable"
      ref="modal"
      :request-album-data="requestAlbumData"
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
