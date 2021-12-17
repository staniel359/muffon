<template>
  <div
    class="item"
    @click="handleClick"
  >
    <i class="red close icon"></i>
    {{ deleteText }}
  </div>
</template>

<script>
export default {
  name: 'DeleteOption',
  emits: [
    'click'
  ],
  computed: {
    deleteText () {
      return this.$t(
        'actions.delete'
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
