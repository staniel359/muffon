<template>
  <div class="view-change-buttons-container">
    <div class="ui buttons">
      <BaseViewChangeButton
        v-for="(button, index) in buttons"
        :key="index"
        :button="button"
        :index="index"
        :view-index="viewIndex"
        @click="handleViewButtonClick"
      />
    </div>
  </div>
</template>

<script>
import BaseViewChangeButton
  from './BaseViewChangeButtons/BaseViewChangeButton.vue'

export default {
  name: 'BaseViewChangeButtons',
  components: {
    BaseViewChangeButton
  },
  props: {
    buttons: {
      type: Array,
      default () {
        return [
          'ul list',
          'th',
          'th list'
        ]
      }
    },
    viewIndex: Number
  },
  emits: [
    'viewButtonClick'
  ],
  methods: {
    handleViewButtonClick (
      index
    ) {
      this.$emit(
        'viewButtonClick',
        index
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.view-change-buttons-container
  @extend .d-flex, .justify-content-flex-end, .flex-full
  margin-left: 1em
</style>
