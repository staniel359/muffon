<template>
  <div class="main-more-container">
    <BaseButton
      class="primary compact circular"
      :text="moreText"
      :is-invertable="false"
      @click="handleClick"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'BaseMoreButton',
  components: {
    BaseButton
  },
  emits: [
    'click'
  ],
  computed: {
    moreText () {
      return this.$t(
        'more'
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
