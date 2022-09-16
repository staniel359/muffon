<template>
  <BaseLabel
    class="primary circular large"
    :text="tagName"
    :link="link"
    :is-invertable="false"
  />
</template>

<script>
import BaseLabel from '*/components/BaseLabel.vue'
import {
  main as formatTagMainLink
} from '*/helpers/formatters/links/tag'

export default {
  name: 'TagItem',
  components: {
    BaseLabel
  },
  props: {
    tagData: {
      type: Object,
      required: true
    }
  },
  computed: {
    link () {
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
