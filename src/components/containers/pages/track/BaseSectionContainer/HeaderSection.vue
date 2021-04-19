<template>
  <div class="ui segment">
    <h3 class="ui header main-header">
      <RouterLink
        v-if="formatHeaderLink"
        class="main-link"
        :to="headerLinkFormatted"
      >
        {{ headerText }}
      </RouterLink>
      <template v-else>
        {{ headerText }}
      </template>
    </h3>
  </div>
</template>

<script>
export default {
  name: 'HeaderSection',
  props: {
    headerText: {
      type: String,
      required: true
    },
    formatHeaderLink: Function,
    artistName: String,
    trackTitle: String
  },
  computed: {
    headerLinkFormatted () {
      return this.formatHeaderLink({
        artistName: this.artistName,
        trackTitle: this.trackTitle
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
