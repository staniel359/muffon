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
import ArtistName from './InfoSection/ArtistName.vue'
import BaseAlbumListenersCount
  from '@/models/album/BaseAlbumListenersCount.vue'

export default {
  name: 'InfoSection',
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
  methods: {
    handleListenersCountLoadEnd (value) {
      this.findPaginationItem({
        uuid: this.uuid
      }).listeners_count = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
