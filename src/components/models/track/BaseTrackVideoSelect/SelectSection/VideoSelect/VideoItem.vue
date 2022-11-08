<template>
  <BaseDropdownItem
    model="video"
    :value="uuid"
    :header="videoTitle"
    :content="channelTitle"
    :image="imageData?.extrasmall"
    is-with-image
  />
</template>

<script>
import BaseDropdownItem from '@/components/dropdowns/BaseDropdownItem.vue'

export default {
  name: 'VideoItem',
  components: {
    BaseDropdownItem
  },
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  computed: {
    uuid () {
      return this.videoData.uuid
    },
    imageData () {
      return this.videoData.image
    },
    videoTitle () {
      return this.videoData.title
    },
    channelTitle () {
      return this.videoData.channel.title
    }
  }
}
</script>

<style lang="sass" scoped></style>
