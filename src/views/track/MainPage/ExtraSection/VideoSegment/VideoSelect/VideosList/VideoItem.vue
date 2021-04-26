<template>
  <BaseDropdownItem
    :data-value="index"
    :header="videoTitle"
    :content="channelTitle"
    :image="image"
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/BaseDropdownItem.vue'
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

<style lang="sass" scoped></style>
