<template>
  <BaseButton
    class="fluid primary main-save-button"
    icon="check"
    :text="saveText"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'

export default {
  name: 'BaseSaveButton',
  components: {
    BaseButton
  },
  emits: [
    'click'
  ],
  computed: {
    saveText () {
      return this.$t(
        'actions.save'
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
