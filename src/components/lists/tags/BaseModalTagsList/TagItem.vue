<template>
  <RouterLink
    class="ui label"
    :to="tagMainLinkFormatted"
    @click="handleClick"
  >
    {{ tagName }}

    <div
      v-if="percent"
      class="detail"
    >
      {{ percentFormatted }}
    </div>
  </RouterLink>
</template>

<script>
import { tagMain as formatTagMainLink } from '#/formatters/links'

export default {
  name: 'TagItem',
  props: {
    tagData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    tagMainLinkFormatted () {
      return formatTagMainLink({
        tagName: this.tagName
      })
    },
    tagName () {
      return this.tagData.name
    },
    percent () {
      return this.tagData.percent
    },
    percentFormatted () {
      return `${this.percent}%`
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped></style>
