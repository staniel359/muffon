<template>
  <div class="content">
    <div class="header">
      <h4 class="link">
        {{ artistName }}
      </h4>
    </div>

    <div class="description">
      {{ listenersCountFormatted }}
    </div>
  </div>
</template>

<script>
import { listenersCount as listenersCountDecorated } from '#/decorators'

export default {
  name: 'InfoBlock',
  props: {
    artistName: {
      type: String,
      required: true
    },
    listenersCount: {
      type: Number,
      required: true
    }
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

<style lang="sass" scoped></style>
