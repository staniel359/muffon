<template>
  <div class="content">
    <BaseHeader
      tag="h4"
      :class="{ link: !isArtistNameActive }"
      :text="albumTitle"
    />

    <ArtistName
      v-if="isWithArtistName"
      :artistName="artistName"
    />

    <BaseAlbumListenersCount
      v-if="isWithListenersCount"
      class="description"
      :albumTitle="albumTitle"
      :artistName="artistName"
      :listenersCount="listenersCount"
      @loadEnd="handleListenersCountLoadEnd"
    />
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import ArtistName from './InfoBlock/ArtistName.vue'
import BaseAlbumListenersCount
  from '@/models/album/BaseAlbumListenersCount.vue'

export default {
  name: 'InfoBlock',
  components: {
    BaseHeader,
    ArtistName,
    BaseAlbumListenersCount
  },
  inject: [
    'findPaginationItem'
  ],
  props: {
    albumTitle: {
      type: String,
      required: true
    },
    artistName: {
      type: String,
      required: true
    },
    listenersCount: Number,
    uuid: String,
    isWithArtistName: Boolean,
    isArtistNameActive: Boolean,
    isWithListenersCount: Boolean
  },
  computed: {
    paginationItem () {
      return this.findPaginationItem({
        uuid: this.uuid
      })
    }
  },
  methods: {
    handleListenersCountLoadEnd (value) {
      this.paginationItem.listeners_count = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
