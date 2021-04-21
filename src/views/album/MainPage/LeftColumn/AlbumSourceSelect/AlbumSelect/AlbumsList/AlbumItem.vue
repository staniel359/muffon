<template>
  <div
    class="item main-dropdown-item"
    @click="handleClick"
  >
    <div class="image-container">
      <BaseImage
        size="extrasmall"
        :image="image"
        isRounded
        isBordered
      />
    </div>

    <div class="content">
      <div class="header">
        {{ albumTitle }}
      </div>
      <div>
        {{ artistName }}
      </div>
    </div>
  </div>
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import { generateKey } from '#/utils'

export default {
  name: 'AlbumItem',
  components: {
    BaseImage
  },
  inject: [
    'setSelectedAlbumData'
  ],
  props: {
    albumData: {
      type: Object,
      required: true
    }
  },
  computed: {
    image () {
      return this.albumData.image.extrasmall
    },
    albumTitle () {
      return this.albumData.title
    },
    artistName () {
      return this.albumData.artist?.name
    }
  },
  methods: {
    handleClick () {
      this.setSelectedAlbumData({
        ...this.albumData,
        id: generateKey()
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
