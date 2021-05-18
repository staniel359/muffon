<template>
  <BaseLabelLinkContainer :link="tagMainLinkFormatted">
    <span class="link">
      {{ tagName }}
    </span>
  </BaseLabelLinkContainer>
</template>

<script>
import BaseLabelLinkContainer from '@/containers/BaseLabelLinkContainer.vue'
import { tagMain as formatTagMainLink } from '#/formatters/links'

export default {
  name: 'TagItem',
  components: {
    BaseLabelLinkContainer
  },
  props: {
    tagData: {
      type: Object,
      required: true
    }
  },
  computed: {
    tagMainLinkFormatted () {
      return formatTagMainLink({
        tagName: this.tagName
      })
    },
    tagName () {
      return this.tagData.name
    }
  }
}
</script>

<style lang="sass" scoped></style>
