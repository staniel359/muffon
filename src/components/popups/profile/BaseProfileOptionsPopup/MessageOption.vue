<template>
  <BaseOption
    icon="message"
    :text="messageText"
    @click="handleClick"
  />
</template>

<script>
import BaseOption from '@/components/popups/options/BaseOption.vue'

export default {
  name: 'MessageOption',
  components: {
    BaseOption
  },
  inject: [
    'hidePopup'
  ],
  emits: [
    'click'
  ],
  computed: {
    messageText () {
      return this.$t(
        'message.send'
      )
    }
  },
  methods: {
    handleClick () {
      this.hidePopup()

      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
