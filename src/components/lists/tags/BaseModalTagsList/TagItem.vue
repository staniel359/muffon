<template>
  <BaseLabel
    class="primary circular large"
    :text="tagName"
    :link="link"
    :is-invertable="false"
  />
</template>

<script>
import BaseLabel from '@/components/labels/BaseLabel.vue'
import {
  main as formatTagLink
} from '@/helpers/formatters/links/tag'

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
      return formatTagLink(
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
