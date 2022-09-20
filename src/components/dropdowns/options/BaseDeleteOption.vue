<template>
  <div
    class="item"
    @click="handleClick"
  >
    <BaseIcon
      icon="red trash alternate outline"
    />

    {{ deleteText }}
  </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  name: 'BaseDeleteOption',
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
