<template>
  <div
    class="item"
    @click="handleClick"
  >
    <BaseIcon
      icon="envelope"
    />

    {{ messageText }}
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'MessageOption',
  components: {
    BaseIcon
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
