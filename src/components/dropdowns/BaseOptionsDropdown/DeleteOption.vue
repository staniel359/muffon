<template>
  <div
    class="item"
    @click="handleClick"
  >
    <BaseIcon
      icon="trash alternate outline"
    />

    {{ deleteText }}
  </div>
</template>

<script>
import BaseIcon from '*/components/BaseIcon.vue'

export default {
  name: 'DeleteOption',
  components: {
    BaseIcon
  },
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
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
