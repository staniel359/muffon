<template>
  <BaseButton
    class="primary circular cancel"
    :text="acceptText"
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
} from '@/helpers/data/links'

export default {
  name: 'AcceptButton',
  components: {
    BaseButton
  },
  inject: [
    'setModalHidden'
  ],
  computed: {
    acceptText () {
      return this.$t(
        'donate.accept'
      )
    }
  },
  methods: {
    handleClick () {
      shell.openExternal(
        donateLink
      )

      this.setModalHidden()
    }
  }
}
</script>

<style lang="sass" scoped></style>
