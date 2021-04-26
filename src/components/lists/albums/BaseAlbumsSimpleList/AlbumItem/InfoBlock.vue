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
  props: {
    albumTitle: {
      type: String,
      required: true
    },
    artistName: {
      type: String,
      required: true
    },
    isWithArtistName: Boolean,
    isArtistNameActive: Boolean,
    isWithListenersCount: Boolean
  }
}
</script>

<style lang="sass" scoped></style>
