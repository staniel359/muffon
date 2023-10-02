<template>
  <BaseLabel
    v-if="count"
    class="basic circular"
    :class="size"
    :left-icon="iconFormatted"
    :text="countFormatted"
    :is-clickable="isClickable"
    @click="handleClick"
  />
</template>

<script>
import BaseLabel from '@/components/labels/BaseLabel.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'BaseCounterLabel',
  components: {
    BaseLabel
  },
  props: {
    counterData: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: 'large'
    }
  },
  data () {
    return {
      icons: {
        listeners: 'listener',
        plays: 'play',
        taggers: 'tagger',
        taggings: 'tagging',
        likes: 'like',
        subscribers: 'subscriber',
        views: 'watch',
        videos: 'video'
      }
    }
  },
  computed: {
    iconFormatted () {
      return this.icons[
        this.scope
      ]
    },
    scope () {
      return this.counterData.scope
    },
    countFormatted () {
      return formatNumber(
        this.count
      )
    },
    count () {
      return (
        this.counterData.count || 0
      )
    },
    isClickable () {
      return this.counterData.isClickable
    }
  },
  methods: {
    handleClick () {
      if (this.isClickable) {
        this.counterData.onClick()
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
