<template>
  <BaseLabelLinkContainer
    :link="tagMainLink"
  >
    <span
      class="link"
      v-text="tagName"
    />
  </BaseLabelLinkContainer>
</template>

<script>
import BaseLabelLinkContainer
  from '*/components/containers/links/BaseLabelLinkContainer.vue'
import {
  main as formatTagMainLink
} from '*/helpers/formatters/links/tag'

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
    tagMainLink () {
      return formatTagMainLink(
        {
          tagName: this.tagName
        }
      )
    },
    tagName () {
      return this.tagData.name
    }
  }
}
</script>

<style lang="sass" scoped></style>
