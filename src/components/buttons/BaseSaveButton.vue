<template>
  <BaseButton
    class="fluid green save-button"
    icon="save"
    :text="saveText"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/buttons/BaseButton.vue'

export default {
  name: 'BaseProfileLibrarySaveButton',
  components: {
    BaseButton
  },
  emits: [
    'click'
  ],
  computed: {
    saveText () {
      return this.$t(
        'buttons.save'
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

<style lang="sass" scoped>
.save-button
  @extend .no-margin
  margin-top: 1em !important
</style>
