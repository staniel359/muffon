<template>
  <div
    class="item main-dropdown-item"
    :class="{ disabled: isDisabled }"
    @click="handleClick"
  >
    <div class="content">
      <h5 class="ui header main-header">
        {{ typeNameFormatted }}
      </h5>
    </div>
  </div>
</template>

<script>
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'TypeItem',
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
    typeNameFormatted () {
      return localize(
        `pages.album.sources.types.${this.typeId}`
      )
    }
  },
  methods: {
    handleClick () {
      this.setSelectedTypeId(this.typeId)
    }
  }
}
</script>

<style lang="sass" scoped></style>
