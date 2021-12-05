<template>
  <div
    class="item"
    @click="handleClick"
  >
    <i class="red close icon"></i>
    {{ textFormatted }}
  </div>
</template>

<script>
export default {
  name: 'DeleteOption',
  emits: [
    'click'
  ],
  computed: {
    textFormatted () {
      return this.$t(
        'buttons.delete'
      )
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped></style>
