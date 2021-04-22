<template>
  <div
    class="item main-dropdown-item"
    :data-value="index"
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
      <h5 class="ui header main-header">
        {{ videoTitle }}
      </h5>
      <div>
        {{ channelTitle }}
      </div>
    </div>
  </div>
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import { generateKey } from '#/utils'

export default {
  name: 'VideoItem',
  components: {
    BaseImage
  },
  inject: [
    'setSelectedVideoData'
  ],
  props: {
    videoData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    image () {
      return this.videoData.image.small
    },
    videoTitle () {
      return this.videoData.title
    },
    channelTitle () {
      return this.videoData.channel.title
    }
  },
  methods: {
    handleClick () {
      this.setSelectedVideoData({
        ...this.videoData,
        uuid: generateKey()
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.image-container
  .image
    width: 40px
</style>
