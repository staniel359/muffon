<template>
  <BaseOption
    icon="message"
    :text="messageText"
    @click="handleClick"
  />
</template>

<script>
import BaseOption from '@/components/dropdowns/options/BaseOption.vue'

export default {
  name: 'MessageOption',
  components: {
    BaseOption
  },
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
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
