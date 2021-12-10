<template>
  <div class="view-change-buttons-container">
    <BaseButtonsContainer class="basic">
      <BaseViewChangeButton
        v-for="(button, index) in buttons"
        :key="index"
        :button="button"
        :index="index"
        :viewIndex="viewIndex"
        @click="handleViewButtonClick"
      />
    </BaseButtonsContainer>
  </div>
</template>

<script>
import BaseButtonsContainer from '@/containers/buttons/BaseButtonsContainer.vue'
import BaseViewChangeButton
  from './BaseViewChangeButtons/BaseViewChangeButton.vue'

export default {
  name: 'BaseViewChangeButtons',
  components: {
    BaseButtonsContainer,
    BaseViewChangeButton
  },
  props: {
    buttons: {
      type: Array,
      default () {
        return ['ul list', 'th', 'th list']
      }
    },
    viewIndex: Number
  },
  emits: [
    'viewButtonClick'
  ],
  methods: {
    handleViewButtonClick (index) {
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
</style>
