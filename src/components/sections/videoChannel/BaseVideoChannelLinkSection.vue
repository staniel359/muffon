<template>
  <div>
    <BaseLink
      v-if="channelId"
      :link="link"
      :text="channelTitle"
      @click="handleLinkClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    />
    <span
      v-else
      v-html="channelTitle"
    />
  </div>
</template>

<script>
import BaseLink from '@/components/links/BaseLink.vue'
import {
  main as formatVideoChannelLink
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
      return formatVideoChannelLink(
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
