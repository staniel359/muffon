<template>
  <div class="ui large labels">
    <BaseLabel
      v-if="isRenderListenersCount"
      icon="user"
      :text="listenersCountFormatted"
    />

    <BaseLabel
      v-if="isRenderPlaysCount"
      icon="music"
      :text="playsCountFormatted"
    />

    <BaseLabel
      v-if="isRenderTaggersCount"
      icon="user"
      :text="taggersCountFormatted"
    />

    <BaseLabel
      v-if="isRenderTaggingsCount"
      icon="tags"
      :text="taggingsCountFormatted"
    />
  </div>
</template>

<script>
import BaseLabel from '*/components/BaseLabel.vue'
import { number as formatNumber } from '*/helpers/formatters'

export default {
  name: 'BaseCounters',
  components: {
    BaseLabel
  },
  props: {
    listenersCount: Number,
    playsCount: Number,
    taggersCount: Number,
    taggingsCount: Number
  },
  computed: {
    isRenderListenersCount () {
      return this.listenersCount >= 0
    },
    listenersCountFormatted () {
      return formatNumber(
        this.listenersCount
      )
    },
    isRenderPlaysCount () {
      return this.playsCount >= 0
    },
    playsCountFormatted () {
      return formatNumber(
        this.playsCount
      )
    },
    isRenderTaggersCount () {
      return this.taggersCount >= 0
    },
    taggersCountFormatted () {
      return formatNumber(
        this.taggersCount
      )
    },
    isRenderTaggingsCount () {
      return this.taggingsCount >= 0
    },
    taggingsCountFormatted () {
      return formatNumber(
        this.taggingsCount
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
