<template>
  <BaseTabsSegmentContainer
    :key="key"
    :tabs="tabs"
  >
    <template
      #default="slotProps"
    >
      <Component
        :is="slotProps.component"
        :class="slotProps.class"
        :is-active="slotProps.isActive"
        :track-data="trackData"
        @focus="slotProps.handleFocus"
      />
    </template>
  </BaseTabsSegmentContainer>
</template>

<script>
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import SimilarTab from './TabsSegment/SimilarTab.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'TabsSegment',
  components: {
    BaseTabsSegmentContainer,
    SimilarTab
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      key: null,
      tabs: [
        {
          nameCode: 'navigation.similar',
          component: 'SimilarTab'
        }
      ]
    }
  },
  watch: {
    trackData: 'handleTrackDataChange'
  },
  methods: {
    handleTrackDataChange () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
