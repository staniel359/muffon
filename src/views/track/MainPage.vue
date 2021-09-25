<template>
  <BaseTrackPageContainer>
    <template #default="slotProps">
      <div
        :class="[
          'ui segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <BaseSegmentContainer>
          <TrackSourceSelect
            :trackData="slotProps.trackData"
          />
        </BaseSegmentContainer>

        <BaseSegmentContainer
          class="track-segment"
          :isLoading="slotProps.isLoading"
          :error="slotProps.error"
          @init="handleInit"
          @refresh="slotProps.handleRefresh"
        >
          <template #default>
            <LeftColumn
              v-if="scrollable"
              :trackData="slotProps.trackData"
              :scrollable="scrollable"
            />

            <RightColumn
              :trackData="slotProps.trackData"
            />
          </template>
        </BaseSegmentContainer>
      </div>
    </template>
  </BaseTrackPageContainer>
</template>

<script>
import BaseTrackPageContainer
  from '@/containers/pages/track/BaseTrackPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import TrackSourceSelect from './MainPage/TrackSourceSelect.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'

export default {
  name: 'MainPage',
  components: {
    BaseTrackPageContainer,
    BaseSegmentContainer,
    TrackSourceSelect,
    LeftColumn,
    RightColumn
  },
  data () {
    return {
      scrollable: null
    }
  },
  methods: {
    handleInit (el) {
      this.scrollable = el
    }
  }
}
</script>

<style lang="sass" scoped>
.main-page-segment-container
  @extend .d-flex

.track-segment
  @extend .flex-full, .d-flex
</style>
