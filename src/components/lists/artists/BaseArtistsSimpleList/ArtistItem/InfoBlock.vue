<template>
  <div class="content">
    <BaseHeader
      class="link"
      :tag="headerTag"
      :text="artistName"
    />

    <div
      v-if="listenersCount"
      class="description"
    >
      {{ listenersCountFormatted }}
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import { listenersCount as listenersCountDecorated } from '#/decorators'

export default {
  name: 'InfoBlock',
  components: {
    BaseHeader
  },
  props: {
    artistName: {
      type: String,
      required: true
    },
    listenersCount: Number,
    isSmall: Boolean
  },
  computed: {
    listenersCountFormatted () {
      return listenersCountDecorated(
        this.listenersCount
      )
    },
    headerTag () {
      return this.isSmall ? 'h4' : 'h3'
    }
  }
}
</script>

<style lang="sass" scoped>
.content
  @extend .no-padding
  margin-left: 10px
</style>
