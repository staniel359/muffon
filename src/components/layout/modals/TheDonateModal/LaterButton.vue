<template>
  <BaseButton
    class="basic circular cancel"
    :text="laterText"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'LaterButton',
  components: {
    BaseButton
  },
  inject: [
    'setModalHidden'
  ],
  computed: {
    laterText () {
      return this.$t(
        'donate.actions.later'
      )
    }
  },
  methods: {
    handleClick () {
      this.setModalHidden(
        {
          isShowLater: true
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
