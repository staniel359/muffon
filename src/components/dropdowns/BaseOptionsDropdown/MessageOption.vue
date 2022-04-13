<template>
  <div
    class="item"
    @click="handleClick"
  >
    <i class="envelope icon" />

    {{ messageText }}
  </div>
</template>

<script>
export default {
  name: 'MessageOption',
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
