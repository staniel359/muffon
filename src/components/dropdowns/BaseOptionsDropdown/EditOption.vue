<template>
  <div
    class="item"
    @click="handleClick"
  >
    <i class="edit icon"></i>
    {{ textFormatted }}
  </div>
</template>

<script>
export default {
  name: 'EditOption',
  emits: [
    'click'
  ],
  computed: {
    textFormatted () {
      return this.$t(
        'buttons.edit'
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
