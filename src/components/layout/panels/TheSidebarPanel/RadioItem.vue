<template>
  <BaseSidebarItem
    icon="broadcast tower"
    :text="radioText"
    :link="radioLink"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  radio as formatRadioLink
} from '@/helpers/formatters/links'

export default {
  name: 'RadioItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    radioText () {
      return this.$t(
        'navigation.radio'
      )
    },
    radioLink () {
      return formatRadioLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
