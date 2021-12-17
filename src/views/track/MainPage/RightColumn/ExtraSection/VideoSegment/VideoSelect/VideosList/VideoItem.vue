<template>
  <BaseDropdownItem
    model="video"
    :data-value="index"
    :header="videoTitle"
    :content="channelTitle"
    :image="imageData?.extrasmall"
    isWithImage
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/dropdowns/BaseDropdownItem.vue'
import { generateKey } from '#/utils'

export default {
  name: 'VideoItem',
  components: {
    BaseDropdownItem
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
    imageData () {
      return this.videoData.image
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

<style lang="sass" scoped></style>
