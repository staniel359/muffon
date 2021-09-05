<template>
  <div class="main-deleted-container">
    <span>
      {{ textFormatted }}
    </span>
  </div>
</template>

<script>
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'BaseBookmarkDeletedBlock',
  computed: {
    textFormatted () {
      return localize(
        'shared.bookmark.deleted'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
