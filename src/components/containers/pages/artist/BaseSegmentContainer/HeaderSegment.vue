<template>
  <div class="ui segment">
    <h3 class="ui header main-header">
      <RouterLink
        v-if="formatHeaderLink"
        class="main-link"
        :to="headerLinkFormatted"
      >
        {{ headerTextFormatted }}
      </RouterLink>
      <template v-else>
        {{ headerTextFormatted }}
      </template>
    </h3>
  </div>
</template>

<script>
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'HeaderSegment',
  props: {
    headerTextKey: {
      type: String,
      required: true
    },
    formatHeaderLink: Function,
    artistName: String
  },
  computed: {
    headerTextFormatted () {
      return localize(
        `pages.artist.segments.${this.headerTextKey}`
      )
    },
    headerLinkFormatted () {
      return this.formatHeaderLink({
        artistName: this.artistName
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
