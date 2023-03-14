<template>
  <BaseSegmentContainer
    ref="segment"
    class="main-page-segment-container"
    :class="{
      'raised main-segment-container': !isAttached
    }"
  >
    <BaseTabsContainer
      :tabs="tabs"
      :items-in-row="itemsInRow"
      :is-fluid="isFluid"
      @tab-click="handleTabClick"
    >
      <template
        v-for="(tabData, index) in tabs"
        :key="index"
        #[index]="slotProps"
      >
        <slot
          class="main-relative-tab"
          :class="slotProps.class"
          :component="tabData.component"
          :is-active="slotProps.isActive"
          :handle-focus="handleFocus"
        />
      </template>
    </BaseTabsContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseTabsContainer
  from '@/components/containers/tabs/BaseTabsContainer.vue'

export default {
  name: 'BaseTabsSegmentContainer',
  components: {
    BaseSegmentContainer,
    BaseTabsContainer
  },
  props: {
    tabs: {
      type: Array,
      required: true
    },
    isFluid: Boolean,
    itemsInRow: Number,
    isAttached: Boolean
  },
  methods: {
    handleTabClick () {
      this.focus()
    },
    handleFocus () {
      this.focus()
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
