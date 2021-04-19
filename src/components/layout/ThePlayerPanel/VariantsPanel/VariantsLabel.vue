<template>
  <div
    class="ui top attached right icon label variants-label"
    @click="handleClick"
  >
    {{ variantsCountFormatted }}

    <i
      class="chevron icon"
      :class="icon"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'VariantsLabel',
  props: {
    isPanelVisible: Boolean
  },
  emits: [
    'click'
  ],
  computed: {
    ...mapGetters('player', {
      playerVariantsCount: 'variantsCount'
    }),
    variantsCountFormatted () {
      return localize(
        'layout.player.variants',
        { number: this.playerVariantsCount }
      )
    },
    icon () {
      return this.isPanelVisible ? 'down' : 'up'
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped>
.variants-label
  @extend .cursor-pointer, .pointer-events-auto
  width: fit-content !important
  left: 20px !important
</style>
