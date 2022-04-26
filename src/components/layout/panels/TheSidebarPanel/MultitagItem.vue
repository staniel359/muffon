<template>
  <BaseSidebarItem
    icon="tags"
    :text="multitagText"
    :link="multitagLink"
  />
</template>

<script>
import BaseSidebarItem from '*/components/BaseSidebarItem.vue'
import {
  multitag as formatMultitagLink
} from '*/helpers/formatters/links'

export default {
  name: 'MultitagItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    multitagText () {
      return this.$t(
        'navigation.multitag'
      )
    },
    multitagLink () {
      return formatMultitagLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
