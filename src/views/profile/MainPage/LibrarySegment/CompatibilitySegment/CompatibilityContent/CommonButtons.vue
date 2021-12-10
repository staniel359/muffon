<template>
  <BaseButton
    v-for="buttonData in buttonsFormatted"
    class="basic compact compatibility-common-button"
    :key="buttonData.uuid"
    :class="{ disabled: buttonData.isDisabled }"
    :icon="buttonData.icon"
    :text="buttonData.text"
    @click="buttonData.onClick"
  />
</template>

<script>
import BaseButton from '@/buttons/BaseButton.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'CommonButtons',
  components: {
    BaseButton
  },
  props: {
    compatibilityData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      scopes: [
        'artists',
        'albums',
        'tracks'
      ],
      icons: {
        artists: 'microphone alternate',
        albums: 'record vinyl',
        tracks: 'music'
      }
    }
  },
  computed: {
    buttonsFormatted () {
      return formatCollection(
        this.buttons
      )
    },
    buttons () {
      return this.scopes.map(
        this.formatButtonData
      )
    }
  },
  methods: {
    handleClick (scope) {
      console.log(scope)
    },
    formatButtonData (scope) {
      return {
        icon: this.icons[scope],
        text: this.formatText(scope),
        isDisabled: !this.formatCount(scope),
        onClick: () => this.handleClick(scope)
      }
    },
    formatText (scope) {
      return this.$t(
        `pages.profile.compatibility.${scope}`,
        { count: this.formatCount(scope) }
      )
    },
    formatCount (scope) {
      return this.compatibilityData[
        `${scope}_count`
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
.compatibility-common-button
  margin-right: 0.5em !important
  margin-bottom: 0.5em !important
</style>
