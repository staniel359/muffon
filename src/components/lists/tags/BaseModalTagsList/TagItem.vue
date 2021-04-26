<template>
  <BaseLabelLinkContainer :link="tagMainLinkFormatted">
    <span class="link">
      {{ tagName }}
    </span>

    <div
      v-if="percent"
      class="detail"
    >
      {{ percentFormatted }}
    </div>
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
    },
    percent () {
      return this.tagData.percent
    },
    percentFormatted () {
      return `${this.percent}%`
    }
  }
}
</script>

<style lang="sass" scoped></style>
