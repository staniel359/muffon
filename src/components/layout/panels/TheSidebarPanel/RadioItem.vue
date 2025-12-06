<template>
  <BaseSidebarItem
    icon="radio"
    :text="text"
    :link-data="linkData"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  radio as formatRadioLinkData
} from '@/helpers/formatters/links'

export default {
  name: 'RadioItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    text () {
      return this.$t(
        'navigation.radio'
      )
    },
    linkData () {
      return formatRadioLinkData()
    }
  }
}
</script>

<style lang="sass" scoped></style>
