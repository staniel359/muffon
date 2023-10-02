<template>
  <BaseSegmentContainer>
    <BaseSearchButton
      scope="sources"
      :is-active="isShowSourceSelect"
      @click="handleSearchButtonClick"
    />

    <BaseTrackSourceSelect
      v-if="isSourceSelectCalled"
      v-show="isShowSourceSelect"
      class="main-bottom-section"
      :track-data="trackData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseSearchButton from '@/components/buttons/BaseSearchButton.vue'
import BaseTrackSourceSelect
  from '@/components/models/track/BaseTrackSourceSelect.vue'

export default {
  name: 'SourceSelectSegment',
  components: {
    BaseSegmentContainer,
    BaseSearchButton,
    BaseTrackSourceSelect
  },
  props: {
    trackData: Object
  },
  data () {
    return {
      isSourceSelectCalled: false,
      isShowSourceSelect: false
    }
  },
  methods: {
    handleSearchButtonClick () {
      this.isSourceSelectCalled = true

      this.isShowSourceSelect =
        !this.isShowSourceSelect
    }
  }
}
</script>

<style lang="sass" scoped></style>
