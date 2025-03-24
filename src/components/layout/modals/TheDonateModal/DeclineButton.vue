<template>
  <BaseButton
    class="basic red circular cancel"
    :text="declineText"
    :is-invertable="false"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'DeclineButton',
  components: {
    BaseButton
  },
  inject: [
    'setModalHidden'
  ],
  computed: {
    declineText () {
      return this.$t(
        'donate.actions.decline'
      )
    }
  },
  methods: {
    handleClick () {
      this.setModalHidden()
    }
  }
}
</script>

<style lang="sass" scoped></style>
