<template>
  <RouterLink
    class="ui label"
    :to="tagMainLinkFormatted"
  >
    {{ tagName }}
  </RouterLink>
</template>

<script>
import { tagMain as formatTagMainLink } from '#/formatters/links'

export default {
  name: 'TagItem',
  props: {
    tagName: {
      type: String,
      required: true
    }
  },
  computed: {
    tagMainLinkFormatted () {
      return formatTagMainLink({
        tagName: this.tagName
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
