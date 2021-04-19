<template>
  <div class="ui large labels">
    <div
      v-if="isRenderListenersCount"
      class="ui basic label"
    >
      <i class="user icon" />
      {{ listenersCountFormatted }}
    </div>

    <div
      v-if="isRenderPlaysCount"
      class="ui basic label"
    >
      <i class="music icon" />
      {{ playsCountFormatted }}
    </div>

    <div
      v-if="isRenderTaggersCount"
      class="ui basic label"
    >
      <i class="user icon" />
      {{ taggersCountFormatted }}
    </div>

    <div
      v-if="isRenderTaggingsCount"
      class="ui basic label"
    >
      <i class="tags icon" />
      {{ taggingsCountFormatted }}
    </div>
  </div>
</template>

<script>
import { number as formatNumber } from '#/formatters'

export default {
  name: 'BaseCounters',
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
      return formatNumber(this.listenersCount)
    },
    isRenderPlaysCount () {
      return this.playsCount >= 0
    },
    playsCountFormatted () {
      return formatNumber(this.playsCount)
    },
    isRenderTaggersCount () {
      return this.taggersCount >= 0
    },
    taggersCountFormatted () {
      return formatNumber(this.taggersCount)
    },
    isRenderTaggingsCount () {
      return this.taggingsCount >= 0
    },
    taggingsCountFormatted () {
      return formatNumber(this.taggingsCount)
    }
  }
}
</script>

<style lang="sass" scoped></style>
