<template>
  <BaseButton
    class="green circular"
    left-icon="donate"
    :text="donateText"
    :is-invertable="false"
    @click="handleClick"
  />
</template>

<script>
import {
  shell
} from 'electron'
import BaseButton from '@/components/buttons/BaseButton.vue'
import {
  donate as donateLink
} from '@/helpers/data/externalLinks'

export default {
  name: 'DonateButtonSection',
  components: {
    BaseButton
  },
  computed: {
    donateText () {
      return this.$t(
        'donate.header'
      )
    }
  },
  methods: {
    handleClick () {
      shell.openExternal(
        donateLink
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
