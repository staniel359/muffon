<template>
  <i
    :class="iconConditional"
    @click="handleClick"
  >
    <div
      v-if="isLoading"
      class="ui mini active inline loader"
    />
  </i>
</template>

<script>
export default {
  name: 'BaseIcon',
  props: {
    isLoading: Boolean,
    isError: Boolean,
    icon: String,
    isFlag: Boolean
  },
  emits: [
    'click'
  ],
  computed: {
    iconConditional () {
      if (this.isFlag) {
        return `${this.icon} flag`
      } else if (this.isLoading) {
        return 'icon'
      } else if (this.isError) {
        return 'close icon'
      } else {
        return `${this.icon} icon`
      }
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
