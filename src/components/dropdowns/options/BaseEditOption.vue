<template>
  <div
    class="item"
    @click="handleClick"
  >
    <BaseIcon
      icon="edit"
    />

    {{ editText }}
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'BaseEditOption',
  components: {
    BaseIcon
  },
  emits: [
    'click'
  ],
  computed: {
    editText () {
      return this.$t(
        'actions.edit'
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
