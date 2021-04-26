<template>
  <BaseDropdownItem
    :header="headerFormatted"
    :isDisabled="isDisabled"
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/BaseDropdownItem.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'TypeItem',
  components: {
    BaseDropdownItem
  },
  inject: [
    'setSelectedTypeId'
  ],
  props: {
    typeId: {
      type: String,
      required: true
    },
    isDisabled: Boolean
  },
  computed: {
    headerFormatted () {
      return localize(
        `pages.album.sources.types.${this.typeId}`
      )
    }
  },
  methods: {
    handleClick () {
      this.setSelectedTypeId(
        this.typeId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
