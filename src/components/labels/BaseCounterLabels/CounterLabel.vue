<template>
  <BaseLabel
    :icon="iconFormatted"
    :text="countFormatted"
  />
</template>

<script>
import BaseLabel from '*/components/BaseLabel.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'CounterLabel',
  components: {
    BaseLabel
  },
  props: {
    counterData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      icons: {
        listeners: 'user',
        plays: 'music',
        taggers: 'user',
        taggings: 'tags',
        likes: 'thumbs up outline',
        subscribers: 'user',
        views: 'eye outline',
        videos: 'film'
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
      return this.counterData.count || 0
    }
  }
}
</script>

<style lang="sass" scoped></style>
