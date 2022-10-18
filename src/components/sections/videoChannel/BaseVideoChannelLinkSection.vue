<template>
  <BaseLink
    :link="link"
    :text="channelTitle"
    @click="handleLinkClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  />
</template>

<script>
import BaseLink from '@/components/links/BaseLink.vue'
import {
  main as formatVideoChannelMainLink
} from '@/helpers/formatters/links/videoChannel'

export default {
  name: 'BaseVideoChannelLinkSection',
  components: {
    BaseLink
  },
  props: {
    modelData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'linkClick',
    'activeChange'
  ],
  computed: {
    link () {
      return formatVideoChannelMainLink(
        {
          channelId: this.channelId
        }
      )
    },
    channelId () {
      return this.channelData.source.id
    },
    channelData () {
      return this.modelData.channel
    },
    channelTitle () {
      return this.channelData.title
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleMouseEnter () {
      this.$emit(
        'activeChange',
        true
      )
    },
    handleMouseLeave () {
      this.$emit(
        'activeChange',
        false
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
