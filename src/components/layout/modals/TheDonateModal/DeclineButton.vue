<template>
  <BaseButton
    class="basic cancel decline-button"
    :text="declineText"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'

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
        'donate.decline'
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

<style lang="sass" scoped>
.decline-button
  margin-right: 1em !important
</style>
