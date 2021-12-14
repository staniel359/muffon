<template>
  <div
    class="item"
    @click="handleClick"
  >
    <i class="envelope icon"></i>
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
        'shared.profile.message'
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
