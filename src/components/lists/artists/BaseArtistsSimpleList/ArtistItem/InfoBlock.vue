<template>
  <div class="content">
    <BaseHeader
      class="link"
      tag="h4"
      :text="artistName"
    />

    <small
      v-if="listenersCount"
      class="description"
    >
      {{ listenersCountFormatted }}
    </small>
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
    listenersCount: Number
  },
  computed: {
    listenersCountFormatted () {
      return listenersCountDecorated(
        this.listenersCount
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.content
  @extend .no-padding
  margin-left: 10px
</style>
